import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  @Input() module: string;
  @Input() data: any;
  @Output() sendModalResponse: EventEmitter<any> = new EventEmitter(); 

  public title: string;
  public disabled = true;

  constructor() { }

  ngOnInit(): void {
    if (this.data !== undefined) {
      this.title = 'Editar';
    } else {
      this.title = 'Crear';
    }
  }

  public listenForm(event: any): void {
    if (event !== undefined) {
      this.disabled = false;
      this.data = event;
    }
  }

  public save(): void {
    this.sendModalResponse.emit(this.data);
  }

  public cancel(): void {
    this.sendModalResponse.emit(undefined);
  }
}
