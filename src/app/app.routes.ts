import { Routes } from '@angular/router';
import { LoginPage } from './pages/login.page';
import { RegisterPage } from './pages/register.page';
import { ArtisanDashboardPage } from './pages/artisan-dashboard.page';
import { AddProductPage } from './pages/artisan-add-product.page';
import { AvailableProductsPage } from './pages/available-products.page';
import { CustomerDashboardPage } from './pages/customer-dashboard.page';

export const routes: Routes = [
    { path: 'auth/login', component: LoginPage },
    { path: 'auth/register', component: RegisterPage },
    { path: 'artisan/dashboard', component: ArtisanDashboardPage },
    { path: 'artisan/add-product', component: AddProductPage },
    { path: 'customer/dashboard', component: CustomerDashboardPage },
    { path: 'customer/available-products', component: AvailableProductsPage },
    { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
    { path: '**', redirectTo: 'auth/login' }];
