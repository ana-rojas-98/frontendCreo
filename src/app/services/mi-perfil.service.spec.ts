import { TestBed } from '@angular/core/testing';

import { MiPerfilService } from './mi-perfil.service';

describe('MiPerfilService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MiPerfilService = TestBed.get(MiPerfilService);
    expect(service).toBeTruthy();
  });
});
