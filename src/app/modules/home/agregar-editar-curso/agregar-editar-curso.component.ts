import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Course } from 'src/app/core/interfaces/course';
import { CourseService } from 'src/app/core/services/courses/courses.service';



@Component({
  selector: 'app-agregar-editar-curso',
  templateUrl: './agregar-editar-curso.component.html',
  styleUrls: ['./agregar-editar-curso.component.css']
})
export class AgregarEditarCursoComponent implements OnInit {
  form: FormGroup;
  maxDate: Date;
  loading: boolean = false;
  operacion: string = 'Agregar ';
  id: number | undefined;

  constructor(public dialogRef: MatDialogRef<AgregarEditarCursoComponent>,
    private fb: FormBuilder, private _cursoService: CourseService,
    private _snackBar: MatSnackBar, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.maxDate = new Date();
    this.form = this.fb.group({
      course_name: ['', Validators.required],
      description: ['', Validators.required],
      modality: ['', Validators.required],
      duration: ['', Validators.required],
      price: ['', Validators.required],
    });
    this.id = data.id;
  }

  ngOnInit(): void {
    this.esEditar(this.id);
  }

  esEditar(id: number | undefined) {
    if (id !== undefined) {
      this.operacion = 'Editar ';
      this.getCurso(id);
    }
  }

  getCurso(id: number) {
    this._cursoService.getCurso(id).subscribe(data => {
      this.form.setValue({
        course_name: data.course_name,
        description: data.description,
        modality: data.modality,
        duration: data.duration,
        price: data.price,
      });
    });
  }

  cancelar() {
    this.dialogRef.close(false);
  }

  addEditCurso() {

    if (this.form.invalid) {
      return;
    }
    type NewType_1 = Course;

    type NewType = NewType_1;

    const curso: NewType = {
      course_name: this.form.value.course_name,
      description: this.form.value.description,
      modality: this.form.value.modality,
      duration: this.form.value.duration,
      price: this.form.value.price,
    };

    this.loading = true;

    if (this.id == undefined) {

      // Es agregar
      this._cursoService.addCurso(curso).subscribe(() => {
        this.mensajeExito('agregado');
      });

    } else {

      // Es editar
      this._cursoService.updateCurso(this.id, curso).subscribe(data => {
        this.mensajeExito('actualizado');
      });
    }
  }

  mensajeExito(operacion: string) {
    this._snackBar.open(`El curso fue ${operacion} con exito`, '', {
      duration: 2000
    });
  }

}




