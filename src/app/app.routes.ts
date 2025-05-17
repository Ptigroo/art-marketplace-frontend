import { Routes } from '@angular/router';
import { LoginPage } from './pages/auth/login/login.page';
import { RegisterPage } from './pages/auth/register/register.page';
import { ArtisanDashboardPage } from './pages/artisan/dashboard/artisan-dashboard.page';
import { AddProductPage } from './pages/artisan/add-product/artisan-add-product.page';
import { AvailableProductsPage } from './pages/customer/available-products/available-products.page';
import { RoleRedirectGuard } from './guards/role-redirect.guard';
import { MyProductsPage } from './pages/customer/my-products/my-products.page';

export const routes: Routes = [
    { path: 'auth/login', component: LoginPage },
    { path: 'auth/register', component: RegisterPage },
    { path: 'artisan/dashboard', component: ArtisanDashboardPage },
    { path: 'artisan/add-product', component: AddProductPage },
    { path: 'customer/bought-products', component: MyProductsPage },
    { path: 'customer/available-products', component: AvailableProductsPage },
    { path: '', canActivate: [RoleRedirectGuard], component: LoginPage }, //set as loginpage but will in fact be a redirection to the correct widget
    { path: '**', redirectTo: 'auth/login' }];
