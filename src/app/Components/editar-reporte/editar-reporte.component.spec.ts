import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarReporteComponent } from './editar-reporte.component';

describe('EditarReporteComponent', () => {
  let component: EditarReporteComponent;
  let fixture: ComponentFixture<EditarReporteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarReporteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarReporteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
