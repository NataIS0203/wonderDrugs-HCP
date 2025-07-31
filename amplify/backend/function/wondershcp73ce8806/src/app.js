import express from 'express';
import serverless from 'serverless-http';
import axios from 'axios';

const app = express();
app.use(express.json());

let axiosInstance;


  const username = process.env.USERNAMEVEEVE;
  const password = process.env.PASSWORDVEEVE;
  const veeveURL = process.env.VEEVEURL;

// Initialize Axios instance
const initAxios = () => {
  axiosInstance = axios.create({
    baseURL: veeveURL,
    timeout: 1000,
  });
};

// Authenticate and fetch session ID
const authenticate = async () => {
  const credentials = {
    username: username,
    password: password,
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
    return fetchData(zip, groupSpecialty, response.data.sessionId);
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
