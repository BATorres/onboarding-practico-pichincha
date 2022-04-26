import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  public form: FormGroup;
  public disabled: boolean = true;

  constructor(
    private _formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.setForm();
  }

  public setForm(isEditing: boolean = false): void {
    this.form = this._formBuilder.group(
      {
        id: null,
        password: [
          null,
          Validators.compose([
            Validators.required,
            Validators.maxLength(8),
            this.passwordValidator(/\d/, { hasNumber: true }),
            this.passwordValidator(/[A-Z]/, { hasCapitalCase: true }),
            this.passwordValidator(/[^\w\s]+/, { hasSpecialCharacter: true }),
          ]),
        ],
        old_password: [null, Validators.required],
        password_confirmation: [null, Validators.required],
      },
      { validator: this.confirmPassword }
    );
  }

  get fc() {
    return this.form.controls;
  }

  public passwordValidator(pattern: RegExp, error: any): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) {
        return null;
      }
      const valid = pattern.test(control.value);

      return valid ? null : error;
    };
  }

  public confirmPassword(control: AbstractControl): void {
    const password: string = control.get('password').value;
    const confirmPassword: string = control.get('password_confirmation').value;
    const passwordsMatch: boolean = password === confirmPassword;
    if (confirmPassword !== null) {
      if (!passwordsMatch) {
        control.get('password_confirmation').setErrors({ noMatch: true });
      }
    }
  }

  public cancel(): void {

  }

  public update(): void {
    
  }
}
