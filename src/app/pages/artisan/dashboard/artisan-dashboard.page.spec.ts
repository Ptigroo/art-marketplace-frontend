import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtisanDashboardPage } from './artisan-dashboard.page';

describe('ArtisanDashboardPage', () => {
  let component: ArtisanDashboardPage;
  let fixture: ComponentFixture<ArtisanDashboardPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArtisanDashboardPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArtisanDashboardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
