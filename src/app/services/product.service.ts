import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'  // 👈 ensures the service is globally available
})
export class ProductService {
  private http = inject(HttpClient);
  private readonly apiUrl = 'https://localhost:5001'; // adapte selon ton backend
  constructor() { }
  createProduct(productData: FormData): Observable<any> {
    const token = localStorage.getItem('token');

  const headers = new HttpHeaders({
    Authorization: `Bearer ${token}`
  });
    return this.http.post(`${this.apiUrl}/addproduct`, productData, {headers});
  }
  getAllProducts(): Observable<any[]> {
    
    const token = localStorage.getItem('token');

  const headers = new HttpHeaders({
    Authorization: `Bearer ${token}`
  });
  return this.http.get<any[]>(`${this.apiUrl}/all`, {headers});
}
}
