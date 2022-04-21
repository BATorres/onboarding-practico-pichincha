import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users: Array<any> = JSON.parse(localStorage.getItem('users')) || [
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

  constructor() { }

  public getAll(): Observable<any> {
    return of(this.users);
  }

  public getUser(userId: number): Observable<any> {
    const userIndex: number = this.users.findIndex((user) => {
      return user?.id === +userId;
    });

    return of(this.users[userIndex]);
  }

  public saveUser(data: any): Observable<any> {
    const lastUser = this.users[this.users.length - 1];
    data.id = lastUser?.id ? lastUser?.id + 1 : 1 ;

    this.users.push(data);
    localStorage.setItem('users', JSON.stringify(this.users));

    return of(this.users);
  }

  public updateUser(data: any): Observable<any> {
    const userIndex: number = this.users.findIndex((user) => {
      return user?.id === data.id;
    });

    this.users[userIndex] = data;
    localStorage.setItem('users', JSON.stringify(this.users));

    return of(this.users);
  }

  public deleteUser(userId: number): Observable<any> {
    const index = this.users.findIndex((user) => user.id === userId);
    this.users.splice(index, 1);
    localStorage.setItem('users', JSON.stringify(this.users));

    return of(this.users);
  }
}
