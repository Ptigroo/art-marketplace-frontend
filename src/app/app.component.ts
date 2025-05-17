import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CustomerToolbarComponent } from './customer-toolbar/customer-toolbar.component';
import { ArtisanToolbarComponent } from './artisan-toolbar/artisan-toolbar.component';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,
    CommonModule,
    CustomerToolbarComponent, 
    ArtisanToolbarComponent],
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
