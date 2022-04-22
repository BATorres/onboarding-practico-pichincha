import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.scss']
})
export class ConfirmationModalComponent implements OnInit {
  @Input() module: string;
  @Input() data: any;
  @Output() sendModalResponse: EventEmitter<any> = new EventEmitter(); 

  public title: string;
  public disabled = true;

  constructor() { }

  ngOnInit(): void {
  }

  public save(): void {
    this.sendModalResponse.emit(true);
  }

  public cancel(): void {
    this.sendModalResponse.emit(false);
  }
}
