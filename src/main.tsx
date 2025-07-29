import React from 'react';
import ReactDOM from 'react-dom/client';
import { Authenticator } from '@aws-amplify/ui-react';
import { Amplify } from 'aws-amplify';
import App from './App.tsx';
import './index.css';
import '@aws-amplify/ui-react/styles.css';
import awsconfig from './aws-exports.ts'; // or your custom config

Amplify.configure(awsconfig);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Authenticator>
      <App />
    </Authenticator>
  </React.StrictMode>
);