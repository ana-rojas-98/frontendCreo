import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerIndicadorComponent } from './ver-indicador.component';

describe('VerIndicadorComponent', () => {
  let component: VerIndicadorComponent;
  let fixture: ComponentFixture<VerIndicadorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerIndicadorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerIndicadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
