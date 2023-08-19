import { TokenCache, TokenStore } from '@commercetools/sdk-client-v2';
import { SessionDataStorage } from '@/controller/session/server';

export default class SessionTokenCache implements TokenCache {
  private sessionStorage = new SessionDataStorage();
  public get(): TokenStore {
    const sessionData = this.sessionStorage.getData();
    return sessionData?.token || { token: '', expirationTime: -1 };
  }

  public set(token: TokenStore): void {
    const sessionData = this.sessionStorage.getData();
    sessionData.token = token;
    this.sessionStorage.save(sessionData);
  }
}
