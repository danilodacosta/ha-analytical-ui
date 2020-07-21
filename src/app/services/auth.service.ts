import { StorageService } from './storage.service';
import { timeout, catchError, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class AuthService {
  constructor(public http: HttpClient, public storage: StorageService) { }

  private baseUrl = 'http://www.mscfilho.net:8088/api/v1';

  public getToken() {

    const body = `type=1&username=danilo&password=19800711&grant_type=password&nomebot=botha`;

    return this.http.post(`https://cors-anywhere.herokuapp.com/${this.baseUrl}/Token`, body).pipe(
      map((resposta: any) => {
        this.storage.setLocalToken(resposta.access_token);
      })
    );
  }
}
