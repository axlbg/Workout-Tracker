import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/auth';
  private username = '';

  constructor(private http: HttpClient) {}

  login(postData: any): Observable<any> {
    return this.http
      .post(`${this.apiUrl}/login`, postData, {
        responseType: 'text', // Cambia 'json' por 'text'
      })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          let errorMsg = 'Error desconocido';

          if (error.error) {
            try {
              // Parse JSON
              const errorJson = JSON.parse(error.error);
              errorMsg = errorJson?.error ?? 'Error desconocido';
            } catch {
              errorMsg = error.error;
            }
          }

          return throwError(() => new Error(errorMsg));
        })
      );
  }

  signup(postData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/signup`, postData);
  }

  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getUsernameFromToken(): string | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      const decodedToken: any = jwtDecode(token);
      return decodedToken.sub || null;
    } catch (error) {
      console.error('Error al decodificar el token:', error);
      return null;
    }
  }
}
