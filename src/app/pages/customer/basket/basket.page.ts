import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { ProductService } from '../../../services/product/product.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-basket',
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    RouterModule,
    ReactiveFormsModule],
  templateUrl: './basket.page.html',
  styleUrl: './basket.page.scss'
})
export class BasketPage {
products: any[] = [];
  constructor(private productService: ProductService,private snackBar: MatSnackBar) {}
  
  ngOnInit(): void {
    this.productService.getBasket().subscribe({
      next: data => this.products = data,
      error: err => console.error('Failed to load products:', err)
    });
  }
  buyBasket(): void {
    this.productService.buyBasket().subscribe({
    next: (res) => { 
      this.products = [];
      this.snackBar.open('Panier acheté!', 'Fermer', {
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
}
