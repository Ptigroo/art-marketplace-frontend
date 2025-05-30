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
  MatIconModule],
  templateUrl: './my-products.page.html',
  styleUrl: './my-products.page.scss'
})
export class MyProductsPage {
 products: any[] = [];
  constructor(private productService: ProductService,private snackBar: MatSnackBar, private dialog: MatDialog) {}
  
  ngOnInit(): void {
    this.productService.getBoughtProducts().subscribe({
      next: data => this.products = data,
      error: err => console.error('Failed to load products:', err)
    });
  }
  
 openReviewDialog(product: any) {
  const dialogRef = this.dialog.open(ReviewDialogComponent, {
    width: '400px',
    data: { product }
  });
  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      // Call backend API to save review
    }
  });
}
}
