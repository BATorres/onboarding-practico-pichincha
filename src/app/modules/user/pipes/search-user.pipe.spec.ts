import { SearchUserPipe } from './search-user.pipe';

describe('SearchUserPipe', () => {
  const pipe = new SearchUserPipe();

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

  it('search user with role Administrador', () => {
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
    expect(pipe.transform(users, 'Administrador')).toStrictEqual([
      {
        id: 2,
        name: 'Usuario 2',
        email: 'usuario2@gmail.com',
        role: 'Administrador',
      },
    ]);
  });
  
  it('search user with yahoo email', () => {
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
    expect(pipe.transform(users, 'yahoo')).toStrictEqual([]);
  });
});
