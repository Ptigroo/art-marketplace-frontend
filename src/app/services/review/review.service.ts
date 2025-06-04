import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private http = inject(HttpClient);
  private readonly apiUrl = 'https://localhost:5001/review'; 
  constructor() { }
  setReview(review: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    if (review.id) {
      return this.http.patch<any>(`${this.apiUrl}/`,review,{headers});
    }
    else
    {
      return this.http.post<any>(`${this.apiUrl}/`,review,{headers});
    }
  }
  respondToReview(reviewResponse: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.patch<any>(`${this.apiUrl}/response/`,reviewResponse,{headers});
  }
  getReview(review: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.get<any>(`${this.apiUrl}/${review.id}`,{headers});
  }
}
