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
import { ReviewService } from '../../services/review/review.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  reviewId = '';
  productId = '';
  reviewText = '';
  responseText = '';
  rating: any = 0;
  isCustomer: boolean = false;
  constructor(private reviewService: ReviewService,
    public dialogRef: MatDialogRef<ReviewDialogComponent>,private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.reviewId = data.product.reviewId;
    this.productId = data.product.id;
    if ( this.reviewId != null) {
      this.getReview();
    }
    this.isCustomer = localStorage.getItem('role') == "Customer";
  }

  getReview()
  {
    this.reviewService.getReview(
    {
      id: this.reviewId,
    }).subscribe({
    next: (res) => { 
      this.rating = res.rating;
      this.reviewText = res.comment;
      this.responseText = res.response;
    }})
  }
  submitReview() {
    this.reviewService.setReview(
    {
      productId: this.productId,
      id: this.reviewId,
      comment: this.reviewText,
      rating: this.rating
    }).subscribe({
    next: (res) => { 
      this.snackBar.open('Revue envoyée!', 'Fermer', {
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


    this.dialogRef.close({
      review: this.reviewText,
      rating: this.rating
    });
  }
  
  submitResponse() {
    this.reviewService.respondToReview(
    {
      id: this.reviewId,
      responseComment: this.responseText
    }).subscribe({
    next: (res) => { 
      this.snackBar.open('Revue envoyée!', 'Fermer', {
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


    this.dialogRef.close({
      review: this.reviewText,
      rating: this.rating
    });
  }
  rateProduct(star: number) {
    if (this.isCustomer) {
      this.rating = star;
    }
  }
}
