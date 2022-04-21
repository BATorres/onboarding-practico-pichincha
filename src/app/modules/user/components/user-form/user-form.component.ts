import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { RoleService } from 'src/app/modules/role/services/role.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  @Input() data: any;
  @Output() sendFormValues: EventEmitter<any> = new EventEmitter();
  
  public form: FormGroup;
  public disabled: boolean = true;
  public roles: Array<any> = [];

  constructor(
    private _formBuilder: FormBuilder,
    private _roleService: RoleService,
  ) { }

  ngOnInit(): void {
    this.setForm();
    this.getRoles();

    if (this.data !== undefined) {
      this.form.setValue({ ...this.data });
    }

    this.form.valueChanges.pipe(debounceTime(1000)).subscribe(
      (fields) => {
        if (this.form.valid) {
          this.disabled = false;
          // this.sendFormValues.emit(this.form.value);
        } else {
          this.disabled = true;
          // this.sendFormValues.emit(undefined);
        }
      }
    );
  }

  public setForm(): void {
      this.form = this._formBuilder.group({
        id: null,
        name: [null, Validators.required],
        email: [null, Validators.compose([Validators.required, Validators.email])],
        role: [null, Validators.required],
      });
  }

  public getRoles(): void {
    this._roleService.getAll().subscribe((data) => this.roles = data);
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

}
