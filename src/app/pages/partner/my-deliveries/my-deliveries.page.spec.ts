import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyDeliveriesPage } from './my-deliveries.page';

describe('MyDeliveriesPage', () => {
  let component: MyDeliveriesPage;
  let fixture: ComponentFixture<MyDeliveriesPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyDeliveriesPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyDeliveriesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
