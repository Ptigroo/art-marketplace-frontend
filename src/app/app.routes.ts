import { Routes } from '@angular/router';
import { LoginPage } from './pages/auth/login/login.page';
import { RegisterPage } from './pages/auth/register/register.page';
import { ArtisanDashboardPage } from './pages/artisan/dashboard/artisan-dashboard.page';
import { AddProductPage } from './pages/artisan/add-product/artisan-add-product.page';
import { AvailableProductsPage } from './pages/customer/available-products/available-products.page';
import { RoleRedirectGuard } from './guards/role-redirect.guard';
import { MyProductsPage } from './pages/customer/my-products/my-products.page';
import { MyProductsAsArtistPage } from './pages/artisan/my-products/my-products.page';
import { BasketPage } from './pages/customer/basket/basket.page';
import { MyDeliveriesPage } from './pages/partner/my-deliveries/my-deliveries.page';

export const routes: Routes = [
    { path: 'auth/login', component: LoginPage },
    { path: 'auth/register', component: RegisterPage },
    { path: 'artisan/my-products', component: MyProductsAsArtistPage },
    { path: 'artisan/add-product', component: AddProductPage },
    { path: 'customer/bought-products', component: MyProductsPage },
    { path: 'customer/basket', component: BasketPage },
    { path: 'customer/available-products', component: AvailableProductsPage },
    { path: 'partner/my-deliveries', component: MyDeliveriesPage },
    { path: '', canActivate: [RoleRedirectGuard], component: LoginPage }, //set as loginpage but will in fact be a redirection to the correct widget
    { path: '**', redirectTo: 'auth/login' }];
