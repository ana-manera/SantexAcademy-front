import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private apiUrl = environment.API_URL;
  constructor(
    private _http: HttpClient
  ) { }

  postRegister(formValue:any): Observable<any[]> {

      let body=formValue
      console.log(body)
     

    return this._http.post<any[]>(`${this.apiUrl}/auth/register`,body);
  }
}
