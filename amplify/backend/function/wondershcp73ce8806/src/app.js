import express from 'express';
import serverless from 'serverless-http';
import { SSMClient, GetParametersCommand } from '@aws-sdk/client-ssm';
import axios from 'axios';

const app = express();
app.use(express.json());

let secrets = {};
let axiosInstance;

// Initialize AWS SSM client
const ssmClient = new SSMClient({});

// Load secrets from SSM
const loadSecrets = async () => {
  const secretKeys = ['password', 'userName', 'veeveURL']
    .map((key) => process.env[key])
    .filter((val) => typeof val === 'string');

  const command = new GetParametersCommand({
    Names: secretKeys,
    WithDecryption: true,
  });

  const response = await ssmClient.send(command);
  response.Parameters?.forEach((param) => {
    if (param.Name && param.Value) {
      secrets[param.Name] = param.Value;
    }
  });
};

// Initialize Axios instance
const initAxios = () => {
  axiosInstance = axios.create({
    baseURL: secrets['veeveURL'],
    timeout: 1000,
  });
};

// Authenticate and fetch session ID
const authenticate = async () => {
  const credentials = {
    username: secrets['userName'],
    password: secrets['password'],
  };

  const formBody = Object.entries(credentials)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&');

  const response = await axiosInstance.post('/auth', formBody, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });

  if (response.data.responseStatus === 'SUCCESS') {
    return response.data.sessionId;
  } else {
    throw new Error('Authentication failed');
  }
};

// Fetch protected data
const fetchData = async (zip, groupSpecialty, sessionId) => {
  const response = await axiosInstance.post(
    '/custom/hcp_request',
    JSON.stringify({ zip, groupSpecialty }),
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: sessionId,
      },
    }
  );

  const {
    Id,
    name,
    title,
    email,
    phone,
    firstName,
    lastName,
    company,
    accountId,
  } = response.data;

  return {
    id: Id,
    name,
    title,
    email,
    phone,
    firstName,
    lastName,
    company,
    accountId,
  };
};

// API route
app.post('/hcp', async (req, res) => {
  try {
    const { zip, groupSpecialty } = req.body;

    if (!axiosInstance) {
      await loadSecrets();
      initAxios();
    }

    const sessionId = await authenticate();
    const result = await fetchData(zip, groupSpecialty, sessionId);

    res.json(result);
  } catch (error) {
    console.error('Error in /hcp:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export const handler = serverless(app);
