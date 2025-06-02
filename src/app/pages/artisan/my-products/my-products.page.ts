import { Component } from '@angular/core';
import { ProductService } from '../../../services/product/product.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar  } from '@angular/material/snack-bar';
import { MatOption, MatSelect } from '@angular/material/select';
import { MatDialog } from '@angular/material/dialog';
import { ReviewDialogComponent } from '../../../components/review-dialog/review-dialog.component';
import { AddProductPage } from '../add-product/artisan-add-product.page';

@Component({
  selector: 'app-my-products',
  imports: [
    CommonModule,
    MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    RouterModule,
    ReactiveFormsModule,
    MatSelect,
    MatOption
  ],
  templateUrl: './my-products.page.html',
  styleUrl: './my-products.page.scss'
})
export class MyProductsAsArtistPage {
products: any[] = [];
totalGains: any = 0;
productStatuses: string[] = ['Disponible', 'Acheté', 'Réservé'];
selectedStatus: string = '';
  constructor(private productService: ProductService,private snackBar: MatSnackBar, private dialog: MatDialog) {}
  ngOnInit(): void {
    this.productService.getMyProductAsArtist().subscribe({
      next: data => {
        this.products = data;
        this.totalGains = this.products
          .filter(product => product.productStatus === 'Bought')
          .reduce((sum, product) => sum + product.price, 0);
      },
      error: err => console.error('Failed to load products:', err)
    });
  }

filteredProducts() {
  return this.selectedStatus
    ? this.products.filter(p => p.productStatus  === this.getStatusAPIName(this.selectedStatus))
    : this.products;
}
getStatusAPIName(status: string): string {
  switch (status) {
    case 'Disponible':
      return 'Available';
    case 'Acheté':
      return 'Bought';
    case 'Réservé':
      return 'Basket';
    default:
      return '';
  }
}
  getStatusFrenchName(status: string): string {
  switch (status) {
    case 'Available':
      return 'Disponible';
    case 'Bought':
      return 'Acheté';
    case 'Basket':
      return 'Réservé';
    default:
      return '';
  }
}

  getDeliveryStatus(deliveryStatus: any) {
    switch (deliveryStatus) {
      case 'ToPickAtArtist':
        return 'Chez l\'artisan';
      case 'PickedFromArtist':
        return 'Récupéré chez l\'artisan';
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
  openReviewDialog(product: any) {
    this.dialog.open(ReviewDialogComponent, {
      width: '400px',
      data: { product }
    });
  }
  openProductDialog(product: any) {
        this.dialog.open(AddProductPage, {
          width: '400px',
          data: { product }
        }).afterClosed().subscribe(result => {
      if (result) {
        const index = this.products.findIndex(p => p.id === result.id);
        if (index !== -1) {
          this.products[index] = result;
        }
      }
    });
  }
  setProductAsPickedUp(product: any) {
    this.productService.setDeliveryStatusAsDone(product.id).subscribe({
      next: (_) => {
        product.deliveryStatus = "PickedFromArtist";
      },
      error: (err) => console.error('Erreur', err)
    });
  }
}
