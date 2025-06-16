import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbar, MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
@Component({
  selector: 'app-admin-toolbar',
  imports: [MatToolbar,
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    RouterModule],
  templateUrl: './admin-toolbar.component.html',
  styleUrl: './admin-toolbar.component.scss'
})
export class AdminToolbarComponent {

  constructor(private authService: AuthService) {}
logout(): void {
    this.authService.logout();
  }
}
