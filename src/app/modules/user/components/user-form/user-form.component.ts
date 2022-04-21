import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { debounceTime } from 'rxjs';
import { RoleService } from '../../../../modules/role/services/role.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit {
  @Input() data: any;
  @Output() sendFormValues: EventEmitter<any> = new EventEmitter();

  public form: FormGroup;
  public disabled: boolean = true;
  public roles: Array<any> = [];
  public id;
  public title: string;

  constructor(
    private _formBuilder: FormBuilder,
    private _roleService: RoleService,
    private _activatedRoute: ActivatedRoute,
    private _userService: UserService
  ) {}

  ngOnInit(): void {
    this.setForm();
    this.getData();
    this.getRoles();

    /* if (this.data !== undefined) {
      this.form.setValue({ ...this.data });
    } */

    this.form.valueChanges.pipe(debounceTime(1000)).subscribe((fields) => {
      if (this.form.valid) {
        this.disabled = false;
        // this.sendFormValues.emit(this.form.value);
      } else {
        this.disabled = true;
        // this.sendFormValues.emit(undefined);
      }
    });
  }

  public setForm(): void {
    this.form = this._formBuilder.group({
      id: null,
      name: [null, Validators.required],
      email: [
        null,
        Validators.compose([Validators.required, Validators.email]),
      ],
      role: [null, Validators.required],
    });
  }

  public getData(): void {
    this.id = this._activatedRoute.snapshot.params['id'];
    if (this.id !== undefined) {
      this.title = 'Editar usuario';
      this._userService
        .getUser(this.id)
        .subscribe((data) => this.form.setValue({ ...data }));
    } else {
      this.title = 'Crear usuario';
    }
  }

  public getRoles(): void {
    this._roleService.getAll().subscribe((data) => (this.roles = data));
  }

  get fc() {
    return this.form.controls;
  }

  public save(): void {
    this.sendFormValues.emit(this.form.value);
  }

  public cancel(): void {
    this.sendFormValues.emit(undefined);
  }

  public submit(): void {
    if (this.id !== undefined) {
      this._userService.updateUser(this.form.value);
    } else {
      this._userService.saveUser(this.form.value);
      this.form.reset();
      this.setForm();
    }
  }
}
