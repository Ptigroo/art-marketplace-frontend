import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtisanToolbarComponent } from './artisan-toolbar.component';

describe('ArtisanToolbarComponent', () => {
  let component: ArtisanToolbarComponent;
  let fixture: ComponentFixture<ArtisanToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArtisanToolbarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArtisanToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
