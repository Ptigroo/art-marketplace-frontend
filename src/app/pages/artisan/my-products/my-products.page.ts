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
  constructor(private productService: ProductService,private snackBar: MatSnackBar, private dialog: MatDialog) {}
  ngOnInit(): void {
    this.productService.getMyProductAsArtist().subscribe({
      next: data => this.products = data,
      error: err => console.error('Failed to load products:', err)
    });
  }
  productStatuses: string[] = ['Disponible', 'Acheté', 'Réservé']; // adjust to your actual enum/string values
selectedStatus: string = '';

filteredProducts() {
  return this.selectedStatus
    ? this.products.filter(p => p.productStatus  === this.getTraslatedStatus(this.selectedStatus))
    : this.products;
}

getStatusClass(status: string): string {
  switch (status) {
    case 'Available':
      return 'available';
    case 'Bought':
      return 'bought';
    case 'Basket':
      return 'booked';
    default:
      return '';
  }
}
getTraslatedStatus(status: string): string {
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
  getstatusfrenchName(status: string): string {
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
  openReviewDialog(product: any) {
    this.dialog.open(ReviewDialogComponent, {
      width: '400px',
      data: { product }
    });
  }
}
