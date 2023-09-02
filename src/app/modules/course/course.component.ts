import { Component, OnInit } from '@angular/core';
import { Course } from 'src/app/core/interfaces/course';
import { CoursesService } from 'src/app/core/services/courses.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {
  courses!: Course[];
  constructor(private _courseSvc: CoursesService) { }

  ngOnInit(): void {
    this.getAllCourses()
  }

  getAllCourses() {
    this._courseSvc.getAll().subscribe((res:Course[]) => {
      this.courses = res;
    })
  }


}
