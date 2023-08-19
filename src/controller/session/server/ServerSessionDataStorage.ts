import { cookies } from 'next/headers';
import { SessionData, SessionDataStorage, getSessionOptions } from '../base';

export default class ServerSessionDataStorage extends SessionDataStorage {
  public constructor(private options = getSessionOptions()) {
    const cookie = cookies().get(options.cookieName)?.value || '{}';
    super(cookie);
  }

  public save(sessionData: SessionData) {
    this.sessionData = sessionData;
    const cookie = this.saveToString();
    cookies().set(this.options.cookieName, cookie);
  }
}
