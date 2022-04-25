import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  FormArray,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime, map, Observable } from 'rxjs';
import { RoleService } from '../../../../modules/role/services/role.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit {
  public form: FormGroup;
  public disabled: boolean = true;
  public roles: Array<any> = [];
  public id;
  public title: string;
  public hobbiesOptions: Array<any> = ['Lectura', 'Música', 'Cocina', 'Fotografía', 'Deportes', 'Baile'];
  public isEditing: boolean = false;

  constructor(
    private _formBuilder: FormBuilder,
    private _roleService: RoleService,
    private _activatedRoute: ActivatedRoute,
    private _userService: UserService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.id = this._activatedRoute.snapshot.params['id'];
    if (this.id !== undefined) {
      this.setForm(true);
    } else {
      this.setForm();
    }
    this.getData();
    this.getRoles();

    /* if (this.data !== undefined) {
      this.form.setValue({ ...this.data });
    } */

    this.form.valueChanges.pipe(debounceTime(1000)).subscribe((fields) => {
      if (this.form.valid) {
        console.log('vale?', this.form.value)
        this.disabled = false;
        // this.sendFormValues.emit(this.form.value);
      } else {
        console.log('values', this.fc['hobbies'].value)
        this.disabled = true;
        // this.sendFormValues.emit(undefined);
      }
    });
  }

  public setForm(isEditing: boolean = false): void {
    this.form = this._formBuilder.group(
      {
        id: null,
        name: [null, Validators.required],
        email: [
          null,
          Validators.compose([Validators.required, Validators.email]),
          [this.emailValidator()],
        ],
        role: [null, Validators.required],
        password: [
          null,
          isEditing ? null : Validators.compose([
            Validators.required,
            Validators.maxLength(8),
            this.passwordValidator(/\d/, { hasNumber: true }),
            this.passwordValidator(/[A-Z]/, { hasCapitalCase: true }),
            this.passwordValidator(/[^\w\s]+/, { hasSpecialCharacter: true }),
          ]),
        ],
        password_confirmation: [null, isEditing ? null : Validators.required],
        hobbies: [null, Validators.compose([Validators.required, Validators.minLength(3)])],
      },
      { validator: this.confirmPassword }
    );
  }

  public getData(): void {
    if (this.id !== undefined) {
      this.title = 'Editar usuario';
      this._userService.getUser(this.id).subscribe(
        (user) => {
          this.isEditing = true;
          this.form.setValue({ ...user.data, password_confirmation: null });
          console.log('quejesto', this.form.value)
        },
        (error) => {
          this._router.navigate(['/usuario']);
        }
      );
    } else {
      this.title = 'Crear usuario';
    }
  }

  public getRoles(): void {
    this._roleService.getAll().subscribe((roles) => (this.roles = roles.data));
  }

  get fc() {
    return this.form.controls;
  }

  public submit(): void {
    if (this.id !== undefined) {
      this._userService.updateUser(this.form.value).subscribe(
        (user) => {
          this._router.navigate(['/usuario']);
        },
        (error) => console.error('error', error)
      );
    } else {
      this._userService.saveUser(this.form.value).subscribe(
        (user) => {
          this._router.navigate(['/usuario']);
        },
        (error) => console.log('error', error)
      );
      /* this.form.reset();
      this.setForm(); */
    }
  }

  public emailValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return this._userService.getSimilarEmail(control.value).pipe(
        map((res) => {
          if (res.data.length > 0) {
            if (this.id !== null && res.data[0]?.id === +this.id) {
              return null;
            } else {
              return { emailExists: true };
            }
          } else {
            return null;
          }
        })
      );
    };
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
}
