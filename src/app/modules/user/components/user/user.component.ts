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
  public title: string;
  public message: string;

  constructor(public _userService: UserService) {}

  ngOnInit(): void {
    this._userService.getAll().subscribe(
      (user) => (this.users = user.data),
      (error) => console.log(error)
    );
  }

  public listenConfirmationModalButtons(event: any): void {
    if (event) {
      this._userService.deleteUser(this.user.id).subscribe(
        (user) => {
          this.showModal = false;
          this.users = user.data;
        },
        (error) => console.error(error)
      );
    } else {
      this.showModal = false;
      this.user = undefined;
    }
  }

  public deleteUser(user: any): void {
    this.showModal = true;
    this.user = user;
    this.title ='Eliminar usuario';
    this.message = `¿Está seguro que desea eliminar el usuario <b>${ user?.name }</b>?`;
  }

  public search(event): void {
    const query = event.target.value;

    if (query.trim() !== '') {
      this._userService.searchUsers(query.toLowerCase().trim()).subscribe(
        (users) => this.users = users.data,
        (error) => console.error(error)
      );
    } else {
      this._userService.getAll().subscribe(
        (user) => (this.users = user.data),
        (error) => console.log(error)
      );
    }
  }
}
