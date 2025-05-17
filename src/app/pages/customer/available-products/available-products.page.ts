import { Component, OnInit } from '@angular/core';
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
  selector: 'app-available-products',
  imports: [
    CommonModule,
    MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    RouterModule,
    ReactiveFormsModule
  ],
  templateUrl: './available-products.page.html',
  styleUrl: './available-products.page.scss'
})
export class AvailableProductsPage implements OnInit {
  products: any[] = [];

  constructor(private productService: ProductService,private snackBar: MatSnackBar) {}
  ngOnInit(): void {
    this.productService.getAllAvailableProducts().subscribe({
      next: data => this.products = data,
      error: err => console.error('Failed to load products:', err)
    });
  }
  buyProduct(product: any): void {
    this.productService.buyProduct(product.id).subscribe({
    next: (res) => { 
      this.products = this.products.filter(p => p.id !== product.id);
      this.snackBar.open('Achat réussi!', 'Fermer', {
        duration: 3000,
        verticalPosition: 'top', 
        horizontalPosition: 'right',
        panelClass: ['snackbar-success']
      });
    },
    error: (err) => {
      this.snackBar.open('Achat échoué, réessayer plus tard.', 'Fermer', {
        duration: 3000,
        panelClass: ['snackbar-error']
      });
    }
  });
  }
}