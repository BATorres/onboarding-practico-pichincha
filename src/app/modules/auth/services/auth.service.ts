import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url: string;

  constructor(private _httpClient: HttpClient) {
    this.url = environment.api;
  }

  public login(data: any): Observable<any> {
    const url = `${this.url}/auth/login`;
    return this._httpClient.post(url, data);
  }
}
