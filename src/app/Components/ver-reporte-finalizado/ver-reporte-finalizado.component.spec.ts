import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerReporteFinalizadoComponent } from './ver-reporte-finalizado.component';

describe('VerReporteFinalizadoComponent', () => {
  let component: VerReporteFinalizadoComponent;
  let fixture: ComponentFixture<VerReporteFinalizadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerReporteFinalizadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerReporteFinalizadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
