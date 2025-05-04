// src/app/pages/login.page.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { JwtHelperService } from '@auth0/angular-jwt';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule
  ],
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage {
  form: FormGroup;
  jwtHelper = new JwtHelperService();
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.authService.login(this.form.value).subscribe({
        next: res => {
          const token = res.token;
          localStorage.setItem('token', token);
          const decoded = this.jwtHelper.decodeToken(token);
          const role = decoded?.role;
          if (role === 'Artisan') {
            this.router.navigate(['/artisan/dashboard']);
          } else if (role === 'Client') {
            this.router.navigate(['/client/dashboard']);
          } else {
            this.router.navigate(['/']);
          }
        },
        error: err => {
          console.error('Login error', err);
        }
      });
    }
  }
}
