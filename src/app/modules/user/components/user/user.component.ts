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

  constructor(public _userService: UserService) {}

  ngOnInit(): void {
    this._userService.getAll().subscribe(
      (user) => (this.users = user.data),
      (error) => console.log('error', error)
    );
  }

  public listenConfirmationModalButtons(event: any): void {
    if (event) {
      this._userService.deleteUser(this.user.id).subscribe(
        (user) => {
          this.showModal = false;
          this.users = user.data;
        },
        (error) => console.error('error', error)
      );
    } else {
      this.showModal = false;
      this.user = undefined;
    }
  }

  public deleteUser(user: any): void {
    this.showModal = true;
    this.user = user;
    /* this._userService
      .deleteUser(userId)
      .subscribe(
        (user) => (this.users = user.data),
        (error) => console.error('error', error),
        ); */
  }
}
