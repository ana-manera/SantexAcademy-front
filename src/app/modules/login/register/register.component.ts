import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../core/services/auth/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RegisterService } from 'src/app/core/services/register/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  public registerForm: FormGroup = new FormGroup({});
  RegisterService: any;
  constructor(
    public authenticationService: AuthService,
    private registerService: RegisterService,
    private router: Router,
    private activated: ActivatedRoute
  ) {}

  ngOnInit(): void {this.createForm()}
  createForm(){
    this.registerForm = new FormGroup({
    first_name: new FormControl(
        null,
        Validators.compose([Validators.required])
      ),
    last_name: new FormControl(
        null,
        Validators.compose([Validators.required])
      ),
      email: new FormControl(
        null,
        Validators.compose([Validators.required])
      ),
      password: new FormControl(
        null,
        Validators.compose([Validators.required])
      ),
      
     
    });
  }
  sendForm(){
    console.log(this.registerForm.value);
    if (this.registerForm.valid) {
      console.log(this.registerForm.value);
      this.registerService.postRegister(this.registerForm.value).subscribe((res: any) => {

      })

      alert('¡Gracias por enviar el formulario!');
    } else {
      console.error('Formulario inválido. Por favor, complete todos los campos requeridos.');
    }
  }

    
  }

