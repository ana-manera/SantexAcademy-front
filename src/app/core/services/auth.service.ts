import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = environment.API_URL;
  constructor(
    private _http: HttpClient
  ) { }

  login(credentials: any): Observable<any> {
    return this._http.post(`${this.apiUrl}/auth/login`,credentials)
  }
}
