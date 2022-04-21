import { APP_BASE_HREF } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { of } from 'rxjs';
import { UserService } from '../../services/user.service';

import { UserFormComponent } from './user-form.component';

describe('UserFormComponent', () => {
  let component: UserFormComponent;
  let fixture: ComponentFixture<UserFormComponent>;
  const service = new UserService();
  const validForm = {
    id: null,
    name: 'Prueba',
    email: 'prueba@hotmail.com',
    role: 'Gerente',
  };
  const mockActivatedRoute = {
    snapshot: {
      params: {
        id: '1',
      }
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserFormComponent ],
      imports: [ FormsModule, ReactiveFormsModule, RouterModule.forRoot([]) ],
      providers: [
        { provide: APP_BASE_HREF, useValue: '/' }, 
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Obtener id de ruta', () => {
    expect(component.id).toBe('1');
  });

  it('Llenar formulario con parámetro de búsqueda', () => {
    const expectedUser = {
      email: 'usuario1@gmail.com',
      id: 1,
      name: 'Usuario 1',
      role: 'Administrador',
    };

    jest.spyOn(service, 'getUser').mockImplementation(() => of([]));

    component.getData();
    expect(component.form.value).toStrictEqual(expectedUser);
  });

  it('Crear formulario válido', () => {
    component.form.setValue({...validForm});

    expect(component.form.valid).toBeTruthy();
  });

  it('Crear formulario con email no válido', () => {
    component.form.setValue({...validForm});
    component.form.controls['email'].setValue('usuario_prueba');

    expect(component.form.controls['email'].errors['email']).toBeTruthy();
  });

  /* it('Crear usuario válido', () => {
    component.id = undefined;
    component.form.setValue({...validForm});

    const spy = jest.spyOn(service, 'saveUser').mockImplementation(() => of([]));

    component.submit();
    expect(spy).toHaveBeenCalled();
  }); */
});
