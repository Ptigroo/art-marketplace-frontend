import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

export interface RegisterDto {
  username: string;
  email: string;
  password: string;
  role: 'Customer' | 'Artisan' | 'DeliveryPartner';
}

export interface LoginDto {
  email: string;
  password: string;
}

interface AuthResponse {
  token: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private readonly apiUrl = 'https://localhost:5001'; // adapte selon ton backend
  private jwtHelper = new JwtHelperService();
  constructor(private router: Router) {}
  
  private roleSubject = new BehaviorSubject<string | null>(localStorage.getItem('role'));
  role$ = this.roleSubject.asObservable();

  setRole(role: string | null) {
    this.roleSubject.next(role);
    if (role) {
      localStorage.setItem('role', role);
    } else {
      localStorage.removeItem('role');
    }
  }
  register(data: RegisterDto): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, data);
  }

  login(data: LoginDto): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, data);
  }
  logout() {
    localStorage.removeItem('token');
    this.setRole(null);
     this.router.navigate(['/auth/login']);
  }

  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
  
  deleteUser(id: any) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
    Authorization: `Bearer ${token}`
  });
    return this.http.delete(`${this.apiUrl}/user/${id}`, {headers});
  }
  getAllUsers(): Observable<any[]> {
    
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
    Authorization: `Bearer ${token}`
  });
  return this.http.get<any[]>(`${this.apiUrl}/users`, {headers});
}
}