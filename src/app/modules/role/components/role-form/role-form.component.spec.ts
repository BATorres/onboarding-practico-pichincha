import { APP_BASE_HREF } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { of } from 'rxjs';
import { RoleService } from '../../services/role.service';

import { RoleFormComponent } from './role-form.component';

describe('RoleFormComponent', () => {
  let component: RoleFormComponent;
  let fixture: ComponentFixture<RoleFormComponent>;
  const service = new RoleService(null);
  const validForm = {
    id: null,
    name: 'Rol prueba',
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
      declarations: [ RoleFormComponent ],
      imports: [ FormsModule, ReactiveFormsModule, RouterModule.forRoot([]), HttpClientModule ],
      providers: [
        {provide: APP_BASE_HREF, useValue: '/'},
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoleFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Obtener id de ruta', () => {
    expect(component.id).toBe('1');
  });

  /* it('Llenar formulario con parámetro de búsqueda', () => {
    const expectedUser = {
      id: 1,
      name: 'Administrador',
    };

    jest.spyOn(service, 'getRole').mockImplementation(() => of([]));

    component.getData();
    expect(component.form.value).toStrictEqual(expectedUser);
  }); */

  it('Crear formulario válido', () => {
    component.form.setValue({...validForm});

    expect(component.form.valid).toBeTruthy();
  });

  it('Crear formulario con nombre no válido', () => {
    component.form.controls['name'].setValue('');

    expect(component.form.controls['name'].errors['required']).toBeTruthy();
  });
});
