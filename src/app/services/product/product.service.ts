import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'  
})
export class ProductService {
  private http = inject(HttpClient);
  private readonly apiUrl = 'https://localhost:5001/product'; 
  constructor() { }
  createProduct(productData: FormData): Observable<any> {
    const token = localStorage.getItem('token');

  const headers = new HttpHeaders({
    Authorization: `Bearer ${token}`
  });
    return this.http.post(`${this.apiUrl}/addproduct`, productData, {headers});
  }
  
  editProduct(productData: FormData, producttId: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    try {
      return this.http.put(`${this.apiUrl}/editproduct/${producttId}`, productData, {headers});
      
    } catch (error) {
      var smth = error;
      throw error;
    }
  }
  getAllAvailableProducts(): Observable<any[]> {
    
    const token = localStorage.getItem('token');

  const headers = new HttpHeaders({
    Authorization: `Bearer ${token}`
  });
  return this.http.get<any[]>(`${this.apiUrl}/availables`, {headers});
}
getBoughtProducts(): Observable<any[]> {
    
  const token = localStorage.getItem('token');
  const headers = new HttpHeaders({
    Authorization: `Bearer ${token}`
  });
  return this.http.get<any[]>(`${this.apiUrl}/bought`, {headers});
}
getBasket(): Observable<any[]> {
    
  const token = localStorage.getItem('token');
  const headers = new HttpHeaders({
    Authorization: `Bearer ${token}`
  });
  return this.http.get<any[]>(`${this.apiUrl}/basket`, {headers});
}
addToBasket(productId: any): Observable<any> {
  const token = localStorage.getItem('token');
  const headers = new HttpHeaders({
    Authorization: `Bearer ${token}`
  });
  return this.http.patch<any>(`${this.apiUrl}/addtobasket/${productId}`,{},{headers});
}
buyBasket(): Observable<any> {
  const token = localStorage.getItem('token');
  const headers = new HttpHeaders({
    Authorization: `Bearer ${token}`
  });
  return this.http.patch<any>(`${this.apiUrl}/buybasket/`,{},{headers});
}


getMyProductAsArtist(): Observable<any> {
    
    const token = localStorage.getItem('token');
  const headers = new HttpHeaders({
    Authorization: `Bearer ${token}`
  });
  return this.http.get<any>(`${this.apiUrl}/artisan/`,{headers});
}
getMyProductsToDeliver(): Observable<any> {
    
    const token = localStorage.getItem('token');
  const headers = new HttpHeaders({
    Authorization: `Bearer ${token}`
  });
  return this.http.get<any>(`${this.apiUrl}/todeliver/`,{headers});
}

setDeliveryStatusAsDone(productId: any): Observable<any> {
  const token = localStorage.getItem('token');
  const headers = new HttpHeaders({
    Authorization: `Bearer ${token}`
  });
  return this.http.patch<any>(`${this.apiUrl}/deliveryStatusUpdate/${productId}`,{},{headers});
}
}
