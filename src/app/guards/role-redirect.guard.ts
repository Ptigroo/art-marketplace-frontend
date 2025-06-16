import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RoleRedirectGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    if (token && role) {
      if (role === 'Artisan') {
        this.router.navigate(['/artisan/my-products']);
      } else if (role === 'Customer') {
        this.router.navigate(['/customer/available-products']);
      } else if (role === 'DeliveryPartner') {
        this.router.navigate(['/partner/my-deliveries']);
      } else if (role === 'Admin') {
        this.router.navigate(['/admin/users']);
      } else {
        this.router.navigate(['/auth/login']);
      }
    } else {
      this.router.navigate(['/auth/login']);
    }

    // Always return false to prevent navigation to empty route
    return false;
  }
}