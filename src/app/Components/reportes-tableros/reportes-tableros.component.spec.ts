import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportesTablerosComponent } from './reportes-tableros.component';

describe('ReportesTablerosComponent', () => {
  let component: ReportesTablerosComponent;
  let fixture: ComponentFixture<ReportesTablerosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportesTablerosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportesTablerosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
