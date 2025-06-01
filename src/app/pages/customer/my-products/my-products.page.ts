import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { ProductService } from '../../../services/product/product.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { ReviewDialogComponent } from '../../../components/review-dialog/review-dialog.component';
import { MatOption, MatSelect } from '@angular/material/select';
@Component({
  selector: 'app-my-products',
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    RouterModule,
    ReactiveFormsModule,
  MatIconModule, MatSelect, MatOption],
  templateUrl: './my-products.page.html',
  styleUrl: './my-products.page.scss'
})
export class MyProductsPage {
  products: any[] = [];
  deliveryStatuses: string[] = ['Livré', 'En livraison'];
  selectedStatus: string = '';
  constructor(private productService: ProductService,private snackBar: MatSnackBar, private dialog: MatDialog) {}
  
  ngOnInit(): void {
    this.productService.getBoughtProducts().subscribe({
      next: data => this.products = data,
      error: err => console.error('Failed to load products:', err)
    });
  }
  
  getDeliveryStatus(product: any) {
    switch (product.deliveryStatus) {
      case 'ToPickAtArtist':
        return 'Chez l\'artisan';
      case 'PickedFromArtist':
        return 'Récupéré chez l\'artistan';
      case 'WaitingForDeliveryOfficier':
        return 'Attente d\'un livreur';
      case 'InDelivery':
        return 'En cours';
      case 'Delivered':
        return 'Livré';
      default:
        return '';
    }
  }
  
filteredProducts() {
  if (!this.selectedStatus) {
    return this.products;
  }
  else
  {
    if (this.selectedStatus == 'Livré') 
    {
      return this.products.filter(p => p.deliveryStatus  === 'Delivered')
    }
    else
    {
      return this.products.filter(p => p.deliveryStatus  !== 'Delivered')
    }
  }
}
 openReviewDialog(product: any) {
  const dialogRef = this.dialog.open(ReviewDialogComponent, {
    width: '400px',
    data: { product }
  });
  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      
    this.productService.reviewProduct(
    {
      id: product.id,
      comment: result.review,
      rating: result.rating
    }).subscribe({
    next: (res) => { 
      this.products = [];
      this.snackBar.open('Revue envoyée!', 'Fermer', {
        duration: 3000,
        verticalPosition: 'top', 
        horizontalPosition: 'right',
        panelClass: ['snackbar-success']
      });
    },
    error: (err) => {
      this.snackBar.open('Opération échouée, réessayer plus tard.', 'Fermer', {
        duration: 3000,
        panelClass: ['snackbar-error']
      });
    }
  });
    }
  });
}
}
