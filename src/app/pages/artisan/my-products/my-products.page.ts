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
    ReactiveFormsModule],
  templateUrl: './my-products.page.html',
  styleUrl: './my-products.page.scss'
})
export class MyProductsAsArtistPage {
products: any[] = [];
  constructor(private productService: ProductService,private snackBar: MatSnackBar) {}
  ngOnInit(): void {
    this.productService.getMyProductAsArtist().subscribe({
      next: data => this.products = data,
      error: err => console.error('Failed to load products:', err)
    });
  }
}
