import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryPartnerToolbarComponent } from './delivery-partner-toolbar.component';

describe('DeliveryPartnerToolbarComponent', () => {
  let component: DeliveryPartnerToolbarComponent;
  let fixture: ComponentFixture<DeliveryPartnerToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeliveryPartnerToolbarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeliveryPartnerToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
