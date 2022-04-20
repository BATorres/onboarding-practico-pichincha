import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  @Input() module: string;
  @Input() data: any;
  @Output() sendFormValues: EventEmitter<any> = new EventEmitter();

  public form: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.setForm(this.module);

    if (this.data !== undefined) {
      this.form.setValue({ ...this.data });
    }

    this.form.valueChanges.pipe(debounceTime(1000)).subscribe(
      (fields) => {
        if (this.form.valid) {
          this.sendFormValues.emit(this.form.value);
        } else {
          this.sendFormValues.emit(undefined);
        }
      }
    );
  }

  public setForm(module: string): void {
    if (module === 'usuario') {
      this.form = this._formBuilder.group({
        id: null,
        name: [null, Validators.required],
        email: [null, Validators.required],
        role: [null, Validators.required],
      });
    } else {
      this.form = this._formBuilder.group({
        id: null,
        name: [null, Validators.required],
      });
    }
  }

  get fc() {
    return this.form.controls;
  }
}
