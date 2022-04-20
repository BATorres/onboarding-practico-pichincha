import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  searchQuery: any;
  headers: Array<string> = [ 'Nombre', 'Acciones' ];
  users: Array<any> = [
    {
      name: 'Usuario 1',
    },
    {
      name: 'Usuario 2',
    }
  ];
  showModal = false;

  constructor() { }

  ngOnInit(): void {
  }

  public createUser(): void {
    this.showModal = true;
  }

  public listenModalButtons(event: any): void {
    if (event === undefined) {
      this.showModal = false;
    }
  }
}
