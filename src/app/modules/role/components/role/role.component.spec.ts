import { APP_BASE_HREF, CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { of } from 'rxjs';
import { SharedModule } from '../../../../shared/shared.module';
import { RoleService } from '../../services/role.service';

import { RoleComponent } from './role.component';

describe('RoleComponent', () => {
  let component: RoleComponent;
  let fixture: ComponentFixture<RoleComponent>;
  const service = new RoleService(null);
  let location: Location;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoleComponent ],
      imports: [ 
        CommonModule,
        FormsModule, 
        ReactiveFormsModule, 
        SharedModule,
        RouterModule.forRoot([]),
        HttpClientModule,
      ],
      providers: [{provide: APP_BASE_HREF, useValue: '/'}]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoleComponent);
    component = fixture.componentInstance;
    component = new RoleComponent(service);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Init: debe cargar los roles', () => {
    const roles: Array<any> = [
      {
        id: 1,
        name: 'Administrador',
      },
      {
        id: 2,
        name: 'Gerente',
      },
      {
        id: 3,
        name: 'Lider célula',
      }
    ];
    
    jest.spyOn(service, 'getAll').mockImplementation(() => of({ data: roles}));

    component.ngOnInit();
    expect( component.roles.length ).toBeGreaterThan(0);
  });

  it('Al seleccionar la opción "Eliminar" en tabla, se debe mostrar el modal de confirmación', () => {
    const roleToDelete = {
      id: 1,
      name: 'Administrador',
    };
    component.deleteRole(roleToDelete);
    fixture.detectChanges();

    expect(component.showModal).toBe(true);
  });
});
