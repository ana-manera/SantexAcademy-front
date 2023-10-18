import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private apiUrl = environment.API_URL;
  constructor(
    private _http: HttpClient
  ) { }

  postContact(formValue:any): Observable<any[]> {
    let body={}
    return this._http.post<any[]>(`${this.apiUrl}/contact`,body);
  }
}
