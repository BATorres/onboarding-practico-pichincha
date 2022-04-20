import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  headers: Array<string> = [ 'Nombre', 'Acciones' ];
  users: Array<any> = [
    {
      name: 'Usuario 1',
    },
    {
      name: 'Usuario 2',
    }
  ];;

  constructor() { }

  ngOnInit(): void {
  }

}
