import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { RoleService } from './role.service';

describe('RoleService', () => {
  let service: RoleService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientModule ]
    });
    service = TestBed.inject(RoleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Debe traer los roles disponibles', (done) => {
    service.getAll().subscribe( role => {
      expect( role.data.length ).toBeGreaterThan(0);

      done();
    });
  });

  it('Debe traer el rol "Administrador"', (done) => {
    service.getRole(1).subscribe( role => {
      expect(role.data).toStrictEqual({
        id: 1,
        name: 'Administrador',
      });

      done();
    });
  });

  it('Debe crear un rol con el nombre "Prueba"', (done) => {
    const data = { id: null, name: 'Prueba' };
    service.saveRole(data).subscribe( role => {
      expect(role.data.length).toBeGreaterThan(0);

      done();
    });
  });

  it('Debe editar el nombre del rol "Prueba" por "Prueba Editada"', (done) => {
    const data = { id: 4, name: 'Prueba Editada' };
    service.updateRole(data).subscribe( role => {
      expect(role.data).toStrictEqual(data);

      done();
    });
  });

  it('Debe eliminar el rol con id 4', (done) => {
    service.deleteRole(4).subscribe( role => {
      expect(role.data.length).toBeGreaterThan(0);

      done();
    });
  });

  it('Debe buscar el rol con nombre "Administrador"', (done) => {
    service.searchRoles('Administrador').subscribe( role => {
      expect(role.data).toStrictEqual({
        id: 1,
        name: 'Administrador',
      });

      done();
    });
  });
});
