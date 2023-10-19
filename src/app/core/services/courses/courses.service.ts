import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Course } from '../../interfaces/course';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) { 
    this.myAppUrl = environment.API_URL;
    this.myApiUrl = 'api/Courses/'              //CAMBIAR !!!!
  }

  getCursos(): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.myAppUrl}/course/all`)
  }

  deleteCurso(id: number): Observable<void> {
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}${id}`);
  }

  addCurso(curso: Course): Observable<void> {
    return this.http.post<void>(`${this.myAppUrl}${this.myApiUrl}`, curso);
  }

  getCurso(id: number): Observable<Course> {
    return this.http.get<Course>(`${this.myAppUrl}${this.myApiUrl}${id}`)
  }

  updateCurso(id: number, curso: Course): Observable<void> {
    return this.http.put<void>(`${this.myAppUrl}${this.myApiUrl}${id}`, curso);
  }
}
