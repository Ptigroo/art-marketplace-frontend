import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatOption, MatSelect } from '@angular/material/select';
import { RouterModule } from '@angular/router';
import { ProductService } from '../../../services/product/product.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-my-deliveries',
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    RouterModule,
    ReactiveFormsModule,
  MatIconModule, MatSelect, MatOption],
  templateUrl: './my-deliveries.page.html',
  styleUrl: './my-deliveries.page.scss'
})
export class MyDeliveriesPage {
  products: any[] = [];
  deliveryStatuses: string[] = ['Chez l\'artisan', 'Récupéré chez l\'artisan', 'Attente d\'un livreur','En cours'];
  selectedStatus: string = '';
  constructor(private productService: ProductService,private snackBar: MatSnackBar, private dialog: MatDialog) {}
  
  ngOnInit(): void {
    this.productService.getMyProductsToDeliver().subscribe({
      next: data => this.products = data,
      error: err => console.error('Failed to load products:', err)
    });
  }
  
  getDeliveryStatus(product: any) {
    switch (product.deliveryStatus) {
      case 'ToPickAtArtist':
        return 'Chez l\'artisan';
      case 'PickedFromArtist':
        return 'Récupéré chez l\'artisan';
      case 'WaitingForDeliveryOfficier':
        return 'Attente d\'un livreur';
      case 'InDelivery':
        return 'En cours';
        default:
          return '';
    }
  }
  
  filteredProducts() {
      if (this.selectedStatus == 'Chez l\'artisan')
      {
        return this.products.filter(p => p.deliveryStatus  === 'ToPickAtArtist')
      }
      if (this.selectedStatus == 'Récupéré chez l\'artisan')
      {
        return this.products.filter(p => p.deliveryStatus  === 'PickedFromArtist')
      }
      if (this.selectedStatus == 'Attente d\'un livreur')
      {
        return this.products.filter(p => p.deliveryStatus  === 'WaitingForDeliveryOfficier')
      }
      if (this.selectedStatus == 'En cours')
      {
        return this.products.filter(p => p.deliveryStatus  === 'InDelivery')
      }
      return this.products.filter(p => p.deliveryStatus  !== 'Delivered')
    }
  updateStatus(product : any) {
    this.productService.setDeliveryStatusAsDone(product.id).subscribe({
      next: data => product.deliveryStatus = data.nextStatus,
      error: err => console.error('Failed to load products:', err)
    });
  }
}
