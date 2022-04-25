import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientModule ]
    });
    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Debe traer los usuarios disponibles', (done) => {
    service.getAll().subscribe( usuario => {
      expect( usuario.data.length ).toBeGreaterThan(0);

      done();
    });
  });

  it('Debe traer el usuario con nombre "Usuario 1"', (done) => {
    service.getUser(1).subscribe( usuario => {
      expect(usuario.data).toStrictEqual({
        id: 1,
        name: 'Usuario 1',
        email: 'usuario1@gmail.com',
        role: 'Administrador',
      });

      done();
    });
  });

  it('Debe crear un nuevo usuario con el nombre "Prueba" y el rol "Gerente"', (done) => {
    const data = { 
      id: null, 
      name: 'Prueba',
      email: 'prueba@gmail.com',
      role: 'Gerente', 
    };

    service.saveUser(data).subscribe( usuario => {
      expect(usuario.data.length).toBeGreaterThan(0);

      done();
    });
  });

  it('Debe editar el nombre del usuario "Prueba" a "Prueba Editada"', (done) => {
    const data = { 
      id: 3, 
      name: 'Prueba editada',
      email: 'prueba@gmail.com',
      role: 'Gerente', 
    };

    service.updateUser(data).subscribe( usuario => {
      expect(usuario.data).toStrictEqual(data);

      done();
    });
  });

  it('Debe eliminar el rol con id 3', (done) => {
    service.deleteUser(3).subscribe( usuario => {
      expect(usuario.data.length).toBeGreaterThan(0);

      done();
    });
  });

  /* it('Debe buscar el usuario con nombre "Usuario 1"', (done) => {
    service.searchUsers('Usuario 1').subscribe( usuario => {
      expect(usuario.data).toStrictEqual([{
        id: 1,
        name: 'Usuario 1',
        email: 'usuario1@gmail.com',
        role: 'Administrador',
      }]);

      done();
    });
  });
  
  it('Debe buscar el usuario con correo "usuario2@gmail.com"', (done) => {
    service.searchUsers('usuario2@gmail.com').subscribe( usuario => {
      expect(usuario.data).toStrictEqual([{
        id: 2,
        name: 'Usuario 2',
        email: 'usuario2@gmail.com',
        role: 'Administrador',
      }]);

      done();
    });
  }); */
});
