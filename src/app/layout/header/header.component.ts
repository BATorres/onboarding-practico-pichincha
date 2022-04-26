import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public menuOptions = [
    {
      name: 'Usuarios',
      path: '/usuario',
      roles: ['Administrador', 'Gerente'],
    },
    {
      name: 'Rol',
      path: '/rol',
      roles: ['Administrador'],
    },
    {
      name: 'Gerencia',
      path: '/gerencia',
      roles: ['Gerente'],
    },
  ];

  public filteredMenu: Array<any>;

  constructor(
    private _router: Router,
  ) { }

  ngOnInit(): void {
    this.checkMenu();
  }

  public checkMenu(): void {
    const user = localStorage.getItem('user');
    this.filteredMenu = this.menuOptions.filter((option) => {
      return option.roles.indexOf(JSON.parse(user).role) !== -1;
    });
  }

  public logout(): void {
    localStorage.removeItem('user');
    this._router.navigate(['/login']);
  }
}
