import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { unescape } from 'querystring';

const { Storage } = Plugins;
@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor() {}

  // TODO : encrypt & decrypt value wiht ATOB
  // https://developer.mozilla.org/en-US/docs/Web/API/WindowBase64/Base64_encoding_and_decoding
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
      return JSON.parse(this.decrypt(ret.value));
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
