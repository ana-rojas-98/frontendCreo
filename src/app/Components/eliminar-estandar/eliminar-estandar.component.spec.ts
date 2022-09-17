import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarEstandarComponent } from './eliminar-estandar.component';

describe('EliminarEstandarComponent', () => {
  let component: EliminarEstandarComponent;
  let fixture: ComponentFixture<EliminarEstandarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EliminarEstandarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EliminarEstandarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
