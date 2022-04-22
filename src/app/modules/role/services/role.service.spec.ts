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
});
