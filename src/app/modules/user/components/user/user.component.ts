import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  public searchQuery: any;
  public headers: Array<string> = ['Nombre', 'Correo', 'Rol', 'Acciones'];
  public users: Array<any> = [];
  public user: any = undefined;
  public showModal = false;

  constructor(private _userService: UserService) {}

  ngOnInit(): void {
    this._userService.getAll().subscribe((data) => (this.users = data));
  }

  public listenModalButtons(event: any): void {
    if (event === undefined) {
      this.showModal = false;
      this.user = undefined;
    } else {
      if (event?.id !== null) {
        this._userService
          .updateUser(event)
          .subscribe((data) => (this.users = data));
      } else {
        this._userService
          .saveUser(event)
          .subscribe((data) => (this.users = data));
      }
      this.showModal = false;
      this.user = false;
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
    this._userService
      .deleteUser(userId)
      .subscribe((data) => (this.users = data));
  }
}
