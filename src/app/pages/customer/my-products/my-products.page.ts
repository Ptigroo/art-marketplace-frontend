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

@Component({
  selector: 'app-my-products',
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    RouterModule,
    ReactiveFormsModule],
  templateUrl: './my-products.page.html',
  styleUrl: './my-products.page.scss'
})
export class MyProductsPage {
 products: any[] = [];
  constructor(private productService: ProductService,private snackBar: MatSnackBar) {}
  
  ngOnInit(): void {
    this.productService.getBoughtProducts().subscribe({
      next: data => this.products = data,
      error: err => console.error('Failed to load products:', err)
    });
  }
}
