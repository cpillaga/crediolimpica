import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancialDateComponent } from './financial-date.component';

describe('FinancialDateComponent', () => {
  let component: FinancialDateComponent;
  let fixture: ComponentFixture<FinancialDateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinancialDateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinancialDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
