import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PermisosRegistrosComponent } from './permisos-registros.component';

describe('PermisosRegistrosComponent', () => {
  let component: PermisosRegistrosComponent;
  let fixture: ComponentFixture<PermisosRegistrosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PermisosRegistrosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PermisosRegistrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
