import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CustomerToolbarComponent } from './components/customer-toolbar/customer-toolbar.component';
import { ArtisanToolbarComponent } from './components/artisan-toolbar/artisan-toolbar.component';
import { AuthService } from './services/auth/auth.service';
import { DeliveryPartnerToolbarComponent } from "./components/delivery-partner-toolbar/delivery-partner-toolbar.component";
import { AdminToolbarComponent } from "./components/admin-toolbar/admin-toolbar.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,
    CommonModule,
    CustomerToolbarComponent,
    ArtisanToolbarComponent, DeliveryPartnerToolbarComponent, AdminToolbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  role: string | null = null;
  title = 'art-marketplace-frontend';
  constructor(private authService: AuthService) {}
  ngOnInit() {
    this.authService.role$.subscribe(role => {
      this.role = role;
    });
  }
}
