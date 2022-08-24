import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroSuperComponent } from './registro-super.component';

describe('RegistroSuperComponent', () => {
  let component: RegistroSuperComponent;
  let fixture: ComponentFixture<RegistroSuperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistroSuperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroSuperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
