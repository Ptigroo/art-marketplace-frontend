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
import { MatOption, MatSelect } from '@angular/material/select';
import { MatDialog } from '@angular/material/dialog';
import { ReviewDialogComponent } from '../../../components/review-dialog/review-dialog.component';
import { AuthService } from '../../../services/auth/auth.service';
@Component({
  selector: 'app-users',
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
    MatOption],
  templateUrl: './users.page.html',
  styleUrl: './users.page.scss'
})
export class UsersPage {

  users: any[] = [];
  userRoles: string[] = ['Artisan', 'Customer', 'DeliveryPartner'];
  selectedRole: string = '';
    constructor(private authService: AuthService,private snackBar: MatSnackBar, private dialog: MatDialog) {}
    ngOnInit(): void {
      this.authService.getAllUsers().subscribe({
        next: data => {
          this.users = data;
        },
        error: err => console.error('Failed to load products:', err)
      });
    }
    
filteredUsers() {
    return this.selectedRole
      ? this.users.filter(u => u.role  === this.selectedRole)
      : this.users;
  }
  
  deleteUser(user: any) {
    this.authService.deleteUser(user.id).subscribe({
      next: (_) => {
        user.deleted = true;
        window.location.reload()
      },
      error: (err) => console.error('Erreur', err)
    });
  }
}
