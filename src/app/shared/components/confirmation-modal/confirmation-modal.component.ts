import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.scss']
})
export class ConfirmationModalComponent implements OnInit {
  @Input() title: string;
  @Input() message: string;
  @Output() sendModalResponse: EventEmitter<any> = new EventEmitter(); 

  constructor() { }

  ngOnInit(): void {
  }

  public delete(): void {
    this.sendModalResponse.emit(true);
  }

  public cancel(): void {
    this.sendModalResponse.emit(false);
  }
}
