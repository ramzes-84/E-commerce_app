import { SessionData } from '../base';

export default abstract class SessionDataStorage {
  protected sessionData: SessionData = {};

  protected constructor(serializedData?: string) {
    if (serializedData) {
      this.sessionData = this.loadFromString(serializedData);
    }
  }

  public getData() {
    return this.sessionData;
  }

  protected loadFromString(serializedData: string) {
    return (this.sessionData = JSON.parse(serializedData) as SessionData);
  }

  protected saveToString() {
    return JSON.stringify(this.sessionData);
  }
}
