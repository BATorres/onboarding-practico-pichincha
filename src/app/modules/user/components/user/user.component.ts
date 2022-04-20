import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  public searchQuery: any;
  public headers: Array<string> = [ 'Nombre', 'Correo', 'Rol', 'Acciones' ];
  public users: Array<any> = [
    {
      id: 1,
      name: 'Usuario 1',
      email: 'usuario1@gmail.com',
      role: 'Administrador',
    },
    {
      id: 2,
      name: 'Usuario 2',
      email: 'usuario2@gmail.com',
      role: 'Administrador',
    }
  ];
  public user: any = undefined;
  public showModal = false;
  public incrementalId: number = this.users.length;

  constructor() { }

  ngOnInit(): void {
  }

  public listenModalButtons(event: any): void {
    if (event === undefined) {
      this.showModal = false;
      this.user = undefined;
    } else {
      if (event?.id !== null) {
        const index = this.users.findIndex((user) => user.id === event.id);
        this.users[index] = event;
      } else {
        this.incrementalId += 1;
        const newUser = {id: this.incrementalId, name: event.name, email: event.email, role: event.role};
        this.users.push(newUser);
      }
      this.showModal = false;
    }
  }

  public createUser(): void {
    this.showModal = true;
  }

  public editUser(user: any): void {
    this.user = user;
    this.showModal = true;
  }

  public deleteUser(userId: any): void {
    const index = this.users.findIndex((user) => user.id === userId);

    if (index !== -1) {
      this.users.splice(index, 1);
    }
  }
}
