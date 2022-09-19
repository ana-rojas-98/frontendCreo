import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndicadoresMasivosComponent } from './indicadores-masivos.component';

describe('IndicadoresMasivosComponent', () => {
  let component: IndicadoresMasivosComponent;
  let fixture: ComponentFixture<IndicadoresMasivosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndicadoresMasivosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndicadoresMasivosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
