import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyProductsAsArtistPage } from './my-products.page';

describe('MyProductsPage', () => {
  let component: MyProductsAsArtistPage;
  let fixture: ComponentFixture<MyProductsAsArtistPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyProductsAsArtistPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyProductsAsArtistPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
