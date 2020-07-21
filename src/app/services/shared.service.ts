import { HttpClient } from '@angular/common/http';
import { STORAGE_KEYS } from './../config/storage_keys.config';
import { Injectable } from '@angular/core';


@Injectable()
export class SharedService {

  private urlToJson = 'assets/tables.json';

  constructor(private http: HttpClient) { }

  getTabs() {
    return this.http.get<any>(this.urlToJson);
  }
}
