import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Course } from '../../interfaces/course';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  private apiUrl = environment.API_URL;
  constructor(
    private _http: HttpClient
  ) { }

  getAll(): Observable<Course[]> {
    return this._http.get<Course[]>(`${this.apiUrl}/course/all`);
  }
}
