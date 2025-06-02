import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbar, MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-delivery-partner-toolbar',
  imports: [MatToolbar,
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    RouterModule],
  templateUrl: './delivery-partner-toolbar.component.html',
  styleUrl: './delivery-partner-toolbar.component.scss'
})
export class DeliveryPartnerToolbarComponent {
  constructor(private authService: AuthService, private dialog: MatDialog) {}
  logout(): void {
    this.authService.logout();
  }
}
