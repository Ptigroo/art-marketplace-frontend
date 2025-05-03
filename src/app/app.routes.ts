import { Routes } from '@angular/router';
import { LoginPage } from './pages/login.page';
import { RegisterPage } from './pages/register.page';

export const routes: Routes = [
    { path: 'auth/login', component: LoginPage },
    { path: 'auth/register', component: RegisterPage },
    { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
    { path: '**', redirectTo: 'auth/login' }];
