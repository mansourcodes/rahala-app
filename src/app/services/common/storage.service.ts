import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { unescape } from 'querystring';

const { Storage } = Plugins;
@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor() { }

  encrypt(value: any) {
    return value;
  }
  decrypt(value: any) {
    return value;
  }

  async store(storageKey: string, value: any) {
    const encryptedValue = this.encrypt(JSON.stringify(value));
    await Storage.set({
      key: storageKey,
      value: encryptedValue
    });
  }

  async get(storageKey: string) {
    const ret = await Storage.get({ key: storageKey });
    if (ret.value) {
      try {
        return JSON.parse(this.decrypt(ret.value));
      } catch (e) {
        return false;
      }
    } else {
      return false;
    }
  }

  async removeItem(storageKey: string) {
    await Storage.remove({ key: storageKey });
  }

  async clear() {
    await Storage.clear();
  }

}
