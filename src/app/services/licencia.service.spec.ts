import { TestBed } from '@angular/core/testing';

import { LicenciaService } from './licencia.service';

describe('LicenciaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LicenciaService = TestBed.get(LicenciaService);
    expect(service).toBeTruthy();
  });
});
