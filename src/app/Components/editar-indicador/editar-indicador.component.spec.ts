import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarIndicadorComponent } from './editar-indicador.component';

describe('EditarIndicadorComponent', () => {
  let component: EditarIndicadorComponent;
  let fixture: ComponentFixture<EditarIndicadorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarIndicadorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarIndicadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
