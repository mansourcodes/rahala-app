import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { unescape } from 'querystring';


const { Storage } = Plugins;
@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  async store(storageKey: string, value: any) {

    const encryptedValue = btoa(escape(JSON.stringify(value)));
    await Storage.set({
      key: storageKey,
      value: encryptedValue
    })
  }


  async get(storageKey: string) {
    const ret = await Storage.get({ key: storageKey });
    if (ret.value) {
      return JSON.parse(unescape(atob(ret.value)));
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
