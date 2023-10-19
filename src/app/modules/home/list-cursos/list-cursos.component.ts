import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CourseService } from 'src/app/core/services/courses/courses.service';
import { Course } from 'src/app/core/interfaces/course';
import { AgregarEditarCursoComponent } from '../agregar-editar-curso/agregar-editar-curso.component';


const listCursos: Course[] = [
  { course_name:'Mathematics', description: 'A course about numbers and equations.', modality: 'Online', duration: '3 months', price: 200 },
  { course_name:'English Language', description: 'A course to learn English.', modality: 'In-Person', duration: '6 months', price: 300 },
  { course_name:'History of Art', description: 'Discover the evolution of art through the ages..', modality: 'Hybrid', duration: '4 months', price: 250 },
  { course_name:'Python Programming', description: 'Learn the fundamentals of Python programming language', modality: 'Online', duration: '2 months', price: 150 },
  { course_name:'Photography Basics', description: 'Explore the art and techniques of photography.', modality: 'In-Person', duration: '3 months', price: 280 },
  { course_name:'Introduction to Psychology', description: 'Gain insights into the human mind and behavior.', modality: 'Online', duration: '5 months', price: 180 },
  { course_name:'Financial Management', description: 'Learn principles of finance and money management.', modality: 'Hybrid', duration: '6 months', price: 320 }

]


@Component({
  selector: 'app-list-cursos',
  templateUrl: './list-cursos.component.html',
  styleUrls: ['./list-cursos.component.css']
})
export class ListCursosComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['nombre', 'descripción', 'modalidad', 'duración', 'precio'];
  dataSource: MatTableDataSource<Course>;
  loading: boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public dialog: MatDialog, private _cursoService: CourseService,
    private _snackBar: MatSnackBar) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.obtenerCursos();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  obtenerCursos() {
    this.loading = true;

    this._cursoService.getCursos().subscribe(data => {
      this.loading = false;
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  addEditCurso(id?: number) {
    const dialogRef = this.dialog.open(AgregarEditarCursoComponent, {
      width: '550px',
      disableClose: true,
      data: { id: id }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.obtenerCursos();
      }
    });
  }

  deleteCurso(id: number) {
    this.loading = true;

    setTimeout(() => {
      this._cursoService.deleteCurso(id).subscribe(() => {
        this.obtenerCursos();
        this.mensajeExito();
      })
    }, 1000);
  }

  mensajeExito() {
    this._snackBar.open('El curso fue eliminada con exito', '', {
      duration: 2000
    });
  }

}
