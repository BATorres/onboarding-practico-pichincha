import { APP_BASE_HREF, CommonModule, Location } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Router, RouterModule, Routes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { ConfirmationModalComponent } from '../../../../shared/components/confirmation-modal/confirmation-modal.component';
import { SharedModule } from '../../../../shared/shared.module';
import { UserService } from '../../services/user.service';
import { UserFormComponent } from '../user-form/user-form.component';

import { UserComponent } from './user.component';

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;
  const service = new UserService(null);
  let compiled: HTMLElement;
  let location: Location;
  let router: Router;
  const routes = [
    {path: 'nuevo', component: UserFormComponent},
  ] as Routes;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserComponent, ConfirmationModalComponent ],
      imports: [ 
        CommonModule,
        FormsModule,
        ReactiveFormsModule, 
        SharedModule,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes(routes),
      ],
      providers: [
        {provide: APP_BASE_HREF, useValue: '/'},
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    location = TestBed.get(Location);
    router = TestBed.get(Router);
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    component = new UserComponent(service);
    fixture.detectChanges();
    compiled = fixture.nativeElement;
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
    
    jest.spyOn(service, 'getAll').mockImplementation(() => of({data: users}));

    component.ngOnInit();
    expect( component.users.length ).toBeGreaterThan(0);
  });

  it('Al seleccionar la opción "Eliminar" en tabla, se debe mostrar el modal de confirmación', () => {
    const userToDelete = {
      id: 1,
      name: 'Usuario 1',
      email: 'usuario1@gmail.com',
      role: 'Gerente',
    };
    component.deleteUser(userToDelete);
    fixture.detectChanges();

    expect(component.showModal).toBe(true);
  });
});
