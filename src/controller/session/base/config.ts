export default function getSessionOptions() {
  return {
    cookieName: process.env.NEXT_PUBLIC_SESSION_COOKIE_NAME || 'APP_SESSION_DATA',
  };
}
