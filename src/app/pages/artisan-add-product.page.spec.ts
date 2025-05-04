import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtisanAddProductPage } from './artisan-add-product.page';

describe('ArtisanAddProductPage', () => {
  let component: ArtisanAddProductPage;
  let fixture: ComponentFixture<ArtisanAddProductPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArtisanAddProductPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArtisanAddProductPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
