import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailableProductsPage } from './available-products.page';

describe('AvailableProductsPage', () => {
  let component: AvailableProductsPage;
  let fixture: ComponentFixture<AvailableProductsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvailableProductsPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AvailableProductsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
