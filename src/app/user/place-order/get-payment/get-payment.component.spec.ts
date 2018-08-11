import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetPaymentComponent } from './get-payment.component';

describe('GetPaymentComponent', () => {
  let component: GetPaymentComponent;
  let fixture: ComponentFixture<GetPaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetPaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
