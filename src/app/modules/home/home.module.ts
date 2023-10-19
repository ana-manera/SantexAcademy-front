import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LayoutModule } from '@angular/cdk/layout';
import { HomePageComponent } from './home-page/home-page.component';
import { RouterModule } from '@angular/router';
import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ContactComponent } from './contact/contact.component';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ListCursosComponent } from './list-cursos/list-cursos.component';
import { MatDialogModule } from '@angular/material/dialog';
import { AgregarEditarCursoComponent } from './agregar-editar-curso/agregar-editar-curso.component';
import { AboutComponent } from './about/about.component';
import { ShopComponent } from './shop/shop.component';
import { CourseComponent } from './course/course.component';




@NgModule({
  declarations: [
    HomePageComponent,
    DashboardComponent,
    ContactComponent,
    ListCursosComponent,
    AgregarEditarCursoComponent,
    AboutComponent,
    ShopComponent,
    CourseComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    HomeRoutingModule,
    RouterModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    LayoutModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatCardModule,
    MatProgressBarModule,
    MatDialogModule,
    FormsModule,

  ]
})
export class HomeModule { }
