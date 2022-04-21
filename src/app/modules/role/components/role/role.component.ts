import { Component, OnInit } from '@angular/core';
import { RoleService } from '../../services/role.service';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss'],
})
export class RoleComponent implements OnInit {
  public searchQuery: any;
  public headers: Array<string> = ['Nombre', 'Acciones'];
  public roles: Array<any> = [];
  public role: any = undefined;
  public showModal = false;

  constructor(private _roleService: RoleService) {}

  ngOnInit(): void {
    this._roleService.getAll().subscribe((data) => (this.roles = data));
  }

  public listenModalButtons(event: any): void {
    if (event === undefined) {
      this.showModal = false;
      this.role = undefined;
    } else {
      if (event?.id !== null) {
        this._roleService
          .updateRole(event)
          .subscribe((data) => (this.roles = data));
      } else {
        this._roleService
          .saveRole(event)
          .subscribe((data) => (this.roles = data));
      }
      this.showModal = false;
      this.role = undefined;
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
    this._roleService
      .deleteRole(roleId)
      .subscribe((data) => (this.roles = data));
  }
}
