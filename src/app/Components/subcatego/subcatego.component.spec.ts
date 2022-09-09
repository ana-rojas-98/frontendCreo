import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubcategoComponent } from './subcatego.component';

describe('SubcategoComponent', () => {
  let component: SubcategoComponent;
  let fixture: ComponentFixture<SubcategoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubcategoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubcategoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
