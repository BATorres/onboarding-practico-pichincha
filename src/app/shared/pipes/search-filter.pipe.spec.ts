import { SearchFilterPipe } from './search-filter.pipe';

describe('SearchFilterPipe', () => {
  const pipe = new SearchFilterPipe();

  const users: Array<any> = [
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
      role: 'Gerente',
    }
  ];

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

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('Buscar usuario con el nombre Usuario 1', () => {
    expect(pipe.transform(users, 'Usuario 1')).toStrictEqual([{
      id: 1,
      name: 'Usuario 1',
      email: 'usuario1@gmail.com',
      role: 'Administrador',
    }]);
  });

  it('Buscar usuario con el rol Gerente', () => {
    expect(pipe.transform(users, 'Gerente')).toStrictEqual([
      {
        id: 2,
        name: 'Usuario 2',
        email: 'usuario2@gmail.com',
        role: 'Gerente',
      },
    ]);
  });
  
  it('Buscar usuario con correo hotmail', () => {
    expect(pipe.transform(users, 'hotmail')).toStrictEqual([]);
  });

  it('Buscar rol con el nombre Administrador', () => {
    expect(pipe.transform(roles, 'Administrador')).toStrictEqual([{
      id: 1,
      name: 'Administrador',
    }]);
  });

  it('Buscar un usuario en una tabla vacia', () => {
    expect(pipe.transform(null, 'Usuario 1')).toStrictEqual(null);
  });

  it('Buscar un un rol en una tabla vacia', () => {
    expect(pipe.transform(null, 'Administrador')).toStrictEqual(null);
  });

  it('Buscar un usuario sin mandar parametro de busqueda', () => {
    expect(pipe.transform(users, null)).toStrictEqual(users);
  });

  it('Buscar un rol sin mandar parametro de busqueda', () => {
    expect(pipe.transform(roles, null)).toStrictEqual(roles);
  });
});
