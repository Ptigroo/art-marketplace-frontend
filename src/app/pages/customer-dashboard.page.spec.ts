import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerDashboardPage } from './customer-dashboard.page';

describe('CustomerDashboardPage', () => {
  let component: CustomerDashboardPage;
  let fixture: ComponentFixture<CustomerDashboardPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerDashboardPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerDashboardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
