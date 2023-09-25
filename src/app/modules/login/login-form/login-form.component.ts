import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from '../../../core/services/auth/auth.service';
import {
  FormGroup,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { hasDot } from 'src/app/core/validators/customs.validator';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {
  @Output() LoginResponse: EventEmitter<any> = new EventEmitter();
  public loginForm: UntypedFormGroup = new UntypedFormGroup({});
  private subscriptions: Subscription = new Subscription();

  constructor(
    public authenticationService: AuthService,
    private router: Router,
    private activated: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.setForm();
  }

  private setForm() {
    this.loginForm = new FormGroup({
      email: new UntypedFormControl(
        null,
        Validators.compose([Validators.required, Validators.email, hasDot()])
      ),
      pass: new UntypedFormControl(
        null,
        Validators.compose([Validators.required])
      ),
    });
  }

  public login() {
    if (this.loginForm.valid) {
      this.subscriptions.add(
        this.authenticationService.login(this.loginForm.value).subscribe({
          next: (res: any) => {
            this.LoginResponse.emit(res);
            if (this.authenticationService.isLoggedIn()) {
              const returnUrl =
                this.activated.snapshot.queryParams['returnUrl'] ||
                '/home/dashboard';
              this.router.navigateByUrl(returnUrl);
            }
          },
          error: (e: any) => {
            console.error(e);
          },
        })
      );
    }
  }

  get invalidEmail(): boolean | undefined {
    return (
      this.loginForm.get('email')?.invalid &&
      this.loginForm.get('email')?.touched
    );
  }

  get invalidPassword(): boolean | undefined {
    return (
      this.loginForm.get('pass')?.invalid && this.loginForm.get('pass')?.touched
    );
  }
}
