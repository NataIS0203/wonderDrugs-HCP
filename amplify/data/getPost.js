import { MSLResponce } from '../amplify/functions/MSLResponce'

const { SSMClient, GetParametersCommand } = require("@aws-sdk/client-ssm");

import axios from 'axios'; 

const client = new SSMClient();

const command = new GetParametersCommand({
  Names: ["password", "userName", "veeveHTML"].map(
    (secretName) => process.env[secretName]
  ),
  WithDecryption: true,
});

client
  .send(command)
  .then((response) => {
    const { Parameters } = response;
    console.log(Parameters);
  })
  .catch((error) => {
    console.error(error);
  });

const instance = axios.create({
  baseURL: secretName('veeveURL'),
  timeout: 1000,
});

export const fetchGetData  = async (zip, groupSpecialty) => {
  return new Promise((resolve, reject) => {
  try {
    const data = {
        username: secretName('userName'),
        password: secretName('password')
    };   

  const formBody = Object.entries(data)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&');

    const response = instance.post('/auth',  formBody, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
    .then(response => {
        // Handle success
        if(response.data.responseStatus = 'SUCCESS'){
          return fetchData(zip, groupSpecialty, response.data.sessionId);
        }
    })
  } catch (error) {
    console.error('Error fetching data: ', error);
    // Handle errors here or throw them to be handled where the function is called
    throw error;
  }
})
  }

  const fetchData = async (zip, groupSpecialty) =>  {
  try {
     const data = {
        zip: zip,
        groupSpecialty: groupSpecialty
    };
   const response = await instance.post('/custom/hcp_request',  JSON.stringify(data), {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': sessionId,
        }
    })
    .then(response => {
        // Handle success
        return new MSLResponce(
          response.data.Id,
          response.data.name,
          response.data.title,
          response.data.email,
          response.data.phone,
          response.data.firstName,
          response.data.lastName,
          response.data.company,
          response.data.accountId,
        )
    })
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

