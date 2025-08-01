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

interface HCPbody {
  data: HCPResponse,
  responseStatus: string;
}

interface HCPdata {
  body: HCPbody,  
  statusCode: number;
}
interface HCPresult {
  data: HCPdata,  
  statusCode: number;
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
           httpMethod: "POST",
           path: "/hcp",
           headers: { "Content-Type": "application/json"},
           body: "{\"zip\": \"" + zip + "\", \"groupSpecialty\": \"" + groupSpecialty + "\"}",
        },
      },
    });

    const { body } = await restOperation.response;
    
    console.log('got body back:', body.json);
    const response = await body.json();
    const result =  response as unknown as HCPresult;    
    console.log('got body data :', result);
    return result.data.body.data;
  } catch (error) {
    console.error('Error calling HCP Lambda:', error);
    throw error;
  }
};

