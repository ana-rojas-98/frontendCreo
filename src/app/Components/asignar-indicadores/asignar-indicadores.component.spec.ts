import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignarIndicadoresComponent } from './asignar-indicadores.component';

describe('AsignarIndicadoresComponent', () => {
  let component: AsignarIndicadoresComponent;
  let fixture: ComponentFixture<AsignarIndicadoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsignarIndicadoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsignarIndicadoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
