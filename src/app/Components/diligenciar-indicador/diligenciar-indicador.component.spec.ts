import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiligenciarIndicadorComponent } from './diligenciar-indicador.component';

describe('DiligenciarIndicadorComponent', () => {
  let component: DiligenciarIndicadorComponent;
  let fixture: ComponentFixture<DiligenciarIndicadorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiligenciarIndicadorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiligenciarIndicadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
