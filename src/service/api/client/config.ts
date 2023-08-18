export default function getApiOptions() {
  const { CTP_API_URL, CTP_SCOPES, CTP_CLIENT_SECRET, CTP_AUTH_URL, CTP_CLIENT_ID, CTP_PROJECT_KEY } = process.env;

  return {
    projectKey: CTP_PROJECT_KEY || '[Need a real projectKey in environment]',
    scopes: CTP_SCOPES?.split(' ').map((item) => item) || ['[Need a real scope in environment]'],
    host: CTP_API_URL || '[Need a real API host in environment]',
    authHost: CTP_AUTH_URL || '[Need a real authentication host in environment]',
    clientId: CTP_CLIENT_ID || '[Need a real clientID in environment]',
    clientSecret: CTP_CLIENT_SECRET || '[Need a real clientSecret in environment]',
  };
}
