import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { debounceTime } from 'rxjs';
import { RoleService } from '../../services/role.service';

@Component({
  selector: 'app-role-form',
  templateUrl: './role-form.component.html',
  styleUrls: ['./role-form.component.scss']
})
export class RoleFormComponent implements OnInit {
  @Input() data: any;
  @Output() sendFormValues: EventEmitter<any> = new EventEmitter();
  
  public form: FormGroup;
  public disabled: boolean = true;
  public id;
  public title: string;

  constructor(
    private _formBuilder: FormBuilder,
    private _roleService: RoleService,
    private _activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.setForm();
    this.getData();

    /* if (this.data !== undefined) {
      this.form.setValue({ ...this.data });
    } */

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
      });
  }

  public getData(): void {
    this.id = this._activatedRoute.snapshot.params['id'];
    if (this.id !== undefined) {
      this.title = 'Editar rol';
      this._roleService
        .getRole(this.id)
        .subscribe((data) => this.form.setValue({ ...data }));
    } else {
      this.title = 'Crear rol'
    }
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
      this._roleService.updateRole(this.form.value);
    } else {
      this._roleService.saveRole(this.form.value);
      this.form.reset();
      this.setForm();
    }
  }
}
