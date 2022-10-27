import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestorNotiComponent } from './gestor-noti.component';

describe('GestorNotiComponent', () => {
  let component: GestorNotiComponent;
  let fixture: ComponentFixture<GestorNotiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestorNotiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestorNotiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
