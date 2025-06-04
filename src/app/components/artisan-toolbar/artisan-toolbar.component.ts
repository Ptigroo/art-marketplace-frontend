import { Component } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { AddProductPage } from '../../pages/artisan/add-product/artisan-add-product.page';
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
  constructor(private authService: AuthService, private dialog: MatDialog) {}
logout(): void {
    this.authService.logout();
  }
  
    openAddProductDialog(product: any = null) {
       const dialogRef = this.dialog.open(AddProductPage, {
        width: '400px',
        data: { product }
      });
    }
}
