import { SearchRolePipe } from './search-role.pipe';

describe('SearchRolePipe', () => {
  const pipe = new SearchRolePipe();

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
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

  it('search role with name Prueba', () => {
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
    expect(pipe.transform(roles, 'Prueba')).toStrictEqual([]);
  });
});
