'use client';

import { useCookies } from 'react-cookie';
import { getSessionOptions } from '@/controller/session/base';
import { SessionData } from '../base';

export default function useSessionData() {
  const options = getSessionOptions();
  const [cookies, setCookie] = useCookies([options.cookieName]);

  return cookies[options.cookieName] as SessionData;
}
