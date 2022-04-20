import { SearchFilterPipe } from './search-filter.pipe';

describe('SearchFilterPipe', () => {
  const pipe = new SearchFilterPipe();

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('search user with name Usuario 2', () => {
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
        role: 'Administrador',
      }
    ];
    expect(pipe.transform(users, 'Usuario 2')).toStrictEqual([{
      id: 2,
      name: 'Usuario 2',
      email: 'usuario2@gmail.com',
      role: 'Administrador',
    }]);
  });

  it('search role with name Administrador', () => {
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
    expect(pipe.transform(roles, 'Administrador')).toStrictEqual([{
      id: 1,
      name: 'Administrador',
    }]);
  });
});
