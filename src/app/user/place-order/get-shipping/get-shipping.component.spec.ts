import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetShippingComponent } from './get-shipping.component';

describe('GetShippingComponent', () => {
  let component: GetShippingComponent;
  let fixture: ComponentFixture<GetShippingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetShippingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetShippingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
