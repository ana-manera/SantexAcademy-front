import { Component } from '@angular/core';
import { CourseService } from 'src/app/core/services/courses/courses.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent {
  public courses: any
  constructor(private courseService: CourseService) {

  }
  ngOnInit(): void {
  this.getAllCourses()
  }
  private getAllCourses() {
    this.courseService.getCursos().subscribe((res: any) => {
    this.courses = res
    console.log(res);

    })
  }

}
