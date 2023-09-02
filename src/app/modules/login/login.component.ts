import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../core/services/auth.service";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  
  constructor(
    private _authSvc: AuthService, 
    private formBuilder: FormBuilder
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    }) 
  }

  ngOnInit(): void {
  }

  login(){
    if (this.loginForm.valid) {
      const emailUser = this.loginForm.get('email')?.value;  
      const passwordUser = this.loginForm.get('password')?.value;

      let credentials = {email:emailUser , password: passwordUser}

      this._authSvc.login(credentials).subscribe((res) => {
        console.log(res)
      })
    }
  }

}
