import { TestBed } from '@angular/core/testing';

import { VisorEventosService } from './visor-eventos.service';

describe('VisorEventosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VisorEventosService = TestBed.get(VisorEventosService);
    expect(service).toBeTruthy();
  });
});
