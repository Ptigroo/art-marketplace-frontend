import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-review-dialog',
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    RouterModule,
    ReactiveFormsModule,
  MatIconModule,
    FormsModule,
MatDialogModule],
  templateUrl: './review-dialog.component.html',
})
export class ReviewDialogComponent {
  reviewText = '';
  rating: any = 0;
  isEditable: boolean = false;
  constructor(
    public dialogRef: MatDialogRef<ReviewDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.reviewText = data.product.reviewComment;
    this.rating = data.product.reviewRating ;
    this.isEditable = localStorage.getItem('role') == "Customer";
  }

  submitReview() {
    this.dialogRef.close({
      review: this.reviewText,
      rating: this.rating
    });
  }
  
  rateProduct(star: number) {
    if (this.isEditable) {
      this.rating = star;
    }
  }
}
