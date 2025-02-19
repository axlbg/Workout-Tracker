import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/auth';

  constructor(private http: HttpClient) {}

  login(postData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, postData, {
      responseType: 'text' as 'json',
    });
  }

  signup(postData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/signup`, postData);
  }
}
