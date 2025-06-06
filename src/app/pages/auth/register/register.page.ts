// src/app/pages/register.page.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth/auth.service';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import {
} from '@angular/material';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatSelectModule
  ],
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss']
})
export class RegisterPage {
  form: FormGroup;

  roles = [
    { label: 'Client', value: 'Customer' },
    { label: 'Artiste', value: 'Artisan' },
    { label: 'Partenaire', value: 'DeliveryPartner' }
  ];
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      role: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.authService.register(this.form.value).subscribe({
        next: () => this.router.navigate(['/auth/login']),
        error: err => alert('Registration failed')
      });
    }
  }
}
