import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportesNuevoTableroComponent } from './reportes-nuevo-tablero.component';

describe('ReportesNuevoTableroComponent', () => {
  let component: ReportesNuevoTableroComponent;
  let fixture: ComponentFixture<ReportesNuevoTableroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportesNuevoTableroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportesNuevoTableroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
