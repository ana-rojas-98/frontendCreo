import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrarIndicadoresComponent } from './administrar-indicadores.component';

describe('AdministrarIndicadoresComponent', () => {
  let component: AdministrarIndicadoresComponent;
  let fixture: ComponentFixture<AdministrarIndicadoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdministrarIndicadoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministrarIndicadoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
