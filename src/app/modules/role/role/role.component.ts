import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})
export class RoleComponent implements OnInit {
  headers: Array<string> = [ 'Nombre', 'Acciones' ];
  roles: Array<any> = [
    {
      name: 'Administrador',
    },
    {
      name: 'Gerente',
    },
    {
      name: 'Lider célula',
    },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
