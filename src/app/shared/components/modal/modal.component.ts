import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  @Input() module: string;
  @Input() title: string;
  @Output() sendModalResponse: EventEmitter<any> = new EventEmitter(); 

  constructor() { }

  ngOnInit(): void {
  }

  public save(): void {
    this.sendModalResponse.emit(true);
  }

  public cancel(): void {
    this.sendModalResponse.emit(undefined);
  }

}
