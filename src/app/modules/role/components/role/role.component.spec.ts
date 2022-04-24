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

  /* it('deleteRole debe llamar al servicio y eliminar el rol con id 2', () => {
    const spy = jest.spyOn(service, 'deleteRole').mockImplementation(() => of([]));

    component.deleteRole(2);
    expect(spy).toBeCalledWith(2);
  }); */

  it('El botón +Nuevo debe ser un enlace a la ruta /rol/nuevo', () => {
    let href = fixture.debugElement.query(By.css('a')).nativeElement.getAttribute('href');;
    
    expect( href ).toEqual('/rol/nuevo');
  });
});
