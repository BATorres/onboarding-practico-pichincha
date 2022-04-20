import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})
export class RoleComponent implements OnInit {
  public searchQuery: any;
  public headers: Array<string> = [ 'Nombre', 'Acciones' ];
  public roles: Array<any> = [
    {
      id: 1,
      name: 'Administrador',
    },
    {
      id: 2,
      name: 'Gerente',
    },
    {
      id: 3,
      name: 'Lider célula',
    },
  ];
  public role: any = undefined;
  public showModal = false;
  public incrementalId: number = this.roles.length;

  constructor() { }

  ngOnInit(): void {
  }

  public listenModalButtons(event: any): void {
    if (event === undefined) {
      this.showModal = false;
      this.role = undefined;
    } else {
      if (event?.id !== null) {
        const index = this.roles.findIndex((user) => user.id === event.id);
        this.roles[index] = event;
      } else {
        this.incrementalId += 1;
        const newRole = {id: this.incrementalId, name: event.name};
        this.roles.push(newRole);
      }
      this.showModal = false;
    }
  }

  public createRole(): void {
    this.showModal = true;
  }

  public editRole(role: any): void {
    this.role = role;
    this.showModal = true;
  }

  public deleteRole(roleId: any): void {
    const index = this.roles.findIndex((role) => role.id === roleId);

    if (index !== -1) {
      this.roles.splice(index, 1);
    }
  }
}
