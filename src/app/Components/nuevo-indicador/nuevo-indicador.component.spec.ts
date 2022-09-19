import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoIndicadorComponent } from './nuevo-indicador.component';

describe('NuevoIndicadorComponent', () => {
  let component: NuevoIndicadorComponent;
  let fixture: ComponentFixture<NuevoIndicadorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NuevoIndicadorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevoIndicadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
