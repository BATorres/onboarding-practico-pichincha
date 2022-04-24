import { APP_BASE_HREF, CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { SharedModule } from '../../../../shared/shared.module';
import { UserService } from '../../services/user.service';

import { UserComponent } from './user.component';

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;
  const service = new UserService(null);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserComponent ],
      imports: [ 
        CommonModule,
        FormsModule,
        ReactiveFormsModule, 
        SharedModule,
        HttpClientTestingModule,
        RouterTestingModule,
      ],
      providers: [
        {provide: APP_BASE_HREF, useValue: '/'},
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    component = new UserComponent(service);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Init: debe cargar los usuarios', () => {
    const users: Array<any> = [
      {
        id: 1,
        name: 'Usuario 1',
        email: 'usuario1@gmail.com',
        role: 'Gerente',
      },
      {
        id: 2,
        name: 'Usuario 2',
        email: 'usuario2@gmail.com',
        role: 'Administrador',
      },
    ];
    
    jest.spyOn(component._userService, 'getAll').mockImplementation(() => of({data: users}));

    component.ngOnInit();
    expect( component.users.length ).toBeGreaterThan(0);
  });

  /*it('deleteUser debe llamar al servicio y eliminar el usuario con id 2', () => {
    const spy = jest.spyOn(service, 'deleteUser').mockImplementation(() => of([]));

    component.deleteUser(2);
    expect(spy).toBeCalledWith(2);
  }); */

  it('El botón +Nuevo debe ser un enlace a la ruta /usuario/nuevo', () => {
    let href = fixture.debugElement.query(By.css('a')).nativeElement.getAttribute('href');
    
    expect(href).toEqual('/usuario/nuevo');
  });
});
