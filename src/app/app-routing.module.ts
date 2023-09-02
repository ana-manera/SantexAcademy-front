import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './modules/home/home.component';
import { LoginComponent } from './modules/login/login.component';
import { RegisterComponent } from './modules/register/register.component';
import { PasswordRecoveryComponent } from './modules/password-recovery/password-recovery.component';
import { DefaultLayoutComponent } from './modules/default-layout/default-layout.component';
import { DashboardPageComponent } from './modules/dashboard/dashboard-page/dashboard-page.component';
import { CourseComponent } from './modules/course/course.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'recovery', component: PasswordRecoveryComponent },
  {
    path: '',
    component: DefaultLayoutComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'dashboard', component: DashboardPageComponent },
      { path: 'courses', component: CourseComponent },
      
    ],
  },
  { path: '**', redirectTo: 'login' },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
