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
    this._roleService.getAll().subscribe((role) => (this.roles = role.data));
  }

  public listenModalButtons(event: any): void {
    if (event) {
      this._roleService.deleteRole(this.role.id).subscribe(
        (role) => {
          this.showModal = false;
          this.roles = role.data;
        },
        (error) => console.error('error', error)
      );
    } else {
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

  public deleteRole(role: any): void {
    this.showModal = true;
    this.role = role;
  }
}
