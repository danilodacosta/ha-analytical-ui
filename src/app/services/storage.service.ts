import { STORAGE_KEYS } from './../config/storage_keys.config';
import { Injectable } from '@angular/core';

@Injectable()
export class StorageService {

      getLocalToken(): string {
        const token = localStorage.getItem(STORAGE_KEYS.access_token);
        if (token == null) {
            return null;
        } else {
            return JSON.parse(token);
        }
     }

    setLocalToken(obj: string) {
        if (obj == null) {
            localStorage.removeItem(STORAGE_KEYS.access_token);
        } else {
           localStorage.setItem(STORAGE_KEYS.access_token, JSON.stringify(obj));
        }
    }
}
