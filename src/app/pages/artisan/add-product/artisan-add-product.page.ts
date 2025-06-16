import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../../../services/product/product.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CategoryService } from '../../../services/category/category.service';
import { MatOption, MatSelect } from '@angular/material/select';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef } from '@angular/material/dialog';

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
    MatSelect,
    MatOption,
    MatDialogContent,
    MatDialogActions
  ],
})
export class AddProductPage {
  productForm: FormGroup;
  selectedFile: File | null = null;
  categories: { id: number; name: string }[] = [];
  isCreation: boolean = false;
  modifiedProduct: any;
  constructor(private fb: FormBuilder, private productService: ProductService, private categoryService: CategoryService,private router: Router,
    public dialogRef: MatDialogRef<AddProductPage>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.productForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      price: [null, Validators.required],
      category: ['', Validators.required],
    });
    if (data.product == null) {
      this.isCreation = true;
    }
    else
    {
      this.modifiedProduct = data.product;
    }
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
    if (!this.productForm.valid || (!this.selectedFile && this.isCreation)) return;

    const formData = new FormData();
    formData.append('title', this.productForm.get('title')?.value);
    formData.append('description', this.productForm.get('description')?.value);
    formData.append('price', this.productForm.get('price')?.value);
    formData.append('categoryId', this.productForm.get('category')?.value.id);

    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }
    if (this.isCreation) {
      this.productService.createProduct(formData).subscribe(() => window.location.reload());
      

    }
    else
    {
      this.modifiedProduct.title = this.productForm.get('title')?.value;
      this.modifiedProduct.description = this.productForm.get('description')?.value;
      this.modifiedProduct.price = this.productForm.get('price')?.value;
      this.modifiedProduct.category = this.productForm.get('category')?.value.name;
      this.productService.editProduct(formData, this.modifiedProduct.id).subscribe();
      this.dialogRef.close(this.modifiedProduct);
    }
  }
  ngOnInit(): void {
    this.categoryService.getCategories().subscribe({
      next: (cats) => {
        this.categories = cats;
      if (!this.isCreation)
      {
        this.productForm.get('title')?.setValue(this.modifiedProduct.title);
        this.productForm.get('description')?.setValue(this.modifiedProduct.description);
        this.productForm.get('price')?.setValue(this.modifiedProduct.price);
        const selectedCat = this.categories.find(cat => cat.name === this.modifiedProduct.category);
        this.productForm.get('category')?.setValue(selectedCat);
        this.imagePreview = this.modifiedProduct.imageUrl;
      }
      },
      error: (err) => console.error('Failed to fetch categories', err)
    });
  }
}
