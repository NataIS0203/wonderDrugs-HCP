import React from 'react';
import ReactDOM from 'react-dom/client';
import { Amplify } from 'aws-amplify';
import App from './App.tsx';
import './index.css';
import '@aws-amplify/ui-react/styles.css';
import amplifyconfig from '../amplify_outputs.json';

Amplify.configure(amplifyconfig);

const existingConfig = Amplify.getConfig();
Amplify.configure({
  ...existingConfig,
  API: {
    ...existingConfig.API,
    REST: {
      ...existingConfig.API?.REST,
      'api71abe4d1': {
        endpoint: 'https://vml1nmph48.execute-api.us-east-2.amazonaws.com/dev',
        region: 'us-east-2'
      }
    }
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <App />
  </React.StrictMode>
);