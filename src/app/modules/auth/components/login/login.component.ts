import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public form: FormGroup;
  public submitted = false;
  public errorMessage: string;

  constructor(
    private _formBuilder: FormBuilder,
    private _authService: AuthService,
    private _router: Router,
  ) {}

  ngOnInit(): void {
    this.setForm();

    if (localStorage.getItem('user') !== null) {
      this._router.navigate(['/']);
    }
  }

  get fc() {
    return this.form.controls;
  }

  public setForm(): void {
    this.form = this._formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required],
    });
  }

  public submit(): void {
    this.submitted = true;
    if (this.form.invalid) return;

    this._authService.login(this.form.value).subscribe(
      (auth) => {
        this.errorMessage = '';
        localStorage.setItem('user', JSON.stringify(auth.data));
      },
      (error) => {
        this.errorMessage = error.error.message;
        console.error(error);
      }
    );
  }
}
