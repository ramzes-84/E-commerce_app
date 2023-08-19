import { getSessionOptions, SessionData, SessionDataStorage } from '../base';

export default class ClientSessionDataStorage extends SessionDataStorage {
  public constructor(
    private cookies: { [p: string]: any },
    private setCookie: (name: string, value: any) => void,
    private options = getSessionOptions()
  ) {
    super();
    console.log('ClientSessionDataStorage cookies: ', cookies);
    console.log('ClientSessionDataStorage options: ', options);
    this.sessionData = cookies[options.cookieName] || {};
  }

  public save(sessionData: SessionData) {
    this.sessionData = sessionData;
    const cookie = this.saveToString();
    this.setCookie(this.options.cookieName, cookie);
  }
}
