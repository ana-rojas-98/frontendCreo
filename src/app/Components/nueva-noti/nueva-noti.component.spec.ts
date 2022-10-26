import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevaNotiComponent } from './nueva-noti.component';

describe('NuevaNotiComponent', () => {
  let component: NuevaNotiComponent;
  let fixture: ComponentFixture<NuevaNotiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NuevaNotiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevaNotiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
