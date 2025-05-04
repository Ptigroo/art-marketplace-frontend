import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-add-product',
  templateUrl: './artisan-add-product.page.html',
  styleUrls: ['./artisan-add-product.page.scss'],
  imports: [
    CommonModule,
    MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    RouterModule,
    ReactiveFormsModule, 
  ],
})
export class AddProductPage {
  productForm: FormGroup;
  selectedFile: File | null = null;

  constructor(private fb: FormBuilder, private productService: ProductService) {
    this.productForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      price: [null, Validators.required],
      category: ['', Validators.required],
    });
  }
  imagePreview: string | ArrayBuffer | null = null;
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
  
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  onSubmit(): void {
    if (!this.productForm.valid || !this.selectedFile) return;

    const formData = new FormData();
    formData.append('title', this.productForm.get('title')?.value);
    formData.append('description', this.productForm.get('description')?.value);
    formData.append('price', this.productForm.get('price')?.value);
    formData.append('category', this.productForm.get('category')?.value);
    formData.append('image', this.selectedFile);

    this.productService.createProduct(formData).subscribe({
      next: res => {
        console.log('Product created:', res);
        this.productForm.reset();
        this.selectedFile = null;
      },
      error: err => {
        console.error('Error creating product:', err);
      },
    });
  }
}
