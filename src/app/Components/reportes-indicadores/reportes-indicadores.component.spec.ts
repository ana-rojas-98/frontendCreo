import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportesIndicadoresComponent } from './reportes-indicadores.component';

describe('ReportesIndicadoresComponent', () => {
  let component: ReportesIndicadoresComponent;
  let fixture: ComponentFixture<ReportesIndicadoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportesIndicadoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportesIndicadoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
