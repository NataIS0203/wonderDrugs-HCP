// fetchHCPData.ts
import { post } from '@aws-amplify/api';

interface HCPResponse {
  id: string;
  name: string;
  title: string;
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  company: string;
  accountId: string;
}

export const fetchHCPData = async (
  zip: string,
  groupSpecialty: string
): Promise<HCPResponse> => {
  try {
    const restOperation = post({
      apiName: 'api71abe4d1', // must match the name of your REST API in Amplify
      path: '/hcp',
      options: {
        body: {
          zip: zip,
          groupSpecialty: groupSpecialty,
        },
      },
    });

    const { body } = await restOperation.response;

    const rawText = await body.text();

    try {
      const parsed = JSON.parse(rawText);
      return parsed.data;

    } catch (err) {
      console.error('Failed to parse JSON:', err);
      throw err;
    }

  } catch (error) {
    console.error('Error calling HCP Lambda:', error);
    throw error;
  }
};

export const fetchHCPRequestData = async (
  assigneeId: string,
  email: string,
  phone: string,
  firstName: string,
  lastName: string,
  accountId: string,
  duration: number
): Promise<string | null> => {
  try {
    const restOperation = post({
      apiName: 'api71abe4d1', // must match the name of your REST API in Amplify
      path: '/hcpmeetingrequest',
      options: {
      body: {
          assigneeId: assigneeId,
          meetingSubject: "HCP - MSL conversation",
          inviteeName: firstName + ' ' + lastName,
          email: email,
          pnone: phone,
          NPINumber: 'NPINumber: ' + accountId, 
          duration: duration,
          accountId: accountId,
          startDate: new Date().toISOString(), // Adjust as needed
          meetingType: 'phone',
          rewuestId: Math.floor(Math.random() * 1000000).toString(), // Example request ID, adjust as needed
        },
      },
    });

    const { body } = await restOperation.response;

    const rawText = await body.text();
    console.log('Raw response text:', rawText);

    try {
      const parsed = JSON.parse(rawText);

      console.log('Parsed JSON:', parsed.data);
      return parsed.data;

    } catch (err) {
      console.error('Failed to parse JSON:', err);
      throw err;
    }

  } catch (error) {
    console.error('Error calling HCP Lambda:', error);
    throw error;
  }
};

