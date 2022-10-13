import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignarIndicadorComponent } from './asignar-indicador.component';

describe('AsignarIndicadorComponent', () => {
  let component: AsignarIndicadorComponent;
  let fixture: ComponentFixture<AsignarIndicadorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsignarIndicadorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsignarIndicadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
