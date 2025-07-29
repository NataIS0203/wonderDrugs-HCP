
// aws-exports.ts
const awsconfig = {
  aws_project_region: "us-east-2",
  aws_cognito_region: "us-east-2",
  aws_user_pools_id: "us-east-2_VBepwawaC",
  aws_user_pools_web_client_id: "auuh9hg8kqj9411lt5mdil3p6",
  authority: "https://cognito-idp.us-east-2.amazonaws.com/us-east-2_VBepwawaC",
  client_id: "auuh9hg8kqj9411lt5mdil3p6",
  redirect_uri: "https://main.d3fe9g6eu8dkfj.amplifyapp.com/main",
  response_type: "code",
  scope: "email openid phone",
  // ... other config values
};

export default awsconfig;
