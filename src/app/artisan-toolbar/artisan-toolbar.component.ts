import { Component } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
@Component({
  selector: 'app-artisan-toolbar',
  imports: [MatToolbar,
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    RouterModule],
  templateUrl: './artisan-toolbar.component.html',
  styleUrl: './artisan-toolbar.component.scss'
})
export class ArtisanToolbarComponent {
  constructor(private authService: AuthService) {}
logout(): void {
    this.authService.logout();
  }
}
