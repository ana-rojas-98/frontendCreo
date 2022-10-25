import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportesNuevoTablero1Component } from './reportes-nuevo-tablero1.component';

describe('ReportesNuevoTablero1Component', () => {
  let component: ReportesNuevoTablero1Component;
  let fixture: ComponentFixture<ReportesNuevoTablero1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportesNuevoTablero1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportesNuevoTablero1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
