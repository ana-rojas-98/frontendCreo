import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarSubcategoriaComponent } from './eliminar-subcategoria.component';

describe('EliminarSubcategoriaComponent', () => {
  let component: EliminarSubcategoriaComponent;
  let fixture: ComponentFixture<EliminarSubcategoriaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EliminarSubcategoriaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EliminarSubcategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
