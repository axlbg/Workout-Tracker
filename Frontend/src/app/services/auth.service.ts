import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { catchError, Observable, throwError } from 'rxjs';
import { GuestService } from './guest.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl + '/api';
  private tokenName = 'workoutTrackerJwt';

  constructor(private http: HttpClient, private guestService: GuestService) {}

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

  signout(): void {
    this.deleteToken();
  }

  saveToken(token: string): void {
    this.guestService.disableGuestMode();
    localStorage.setItem(this.tokenName, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenName);
  }

  deleteToken(): void {
    localStorage.removeItem(this.tokenName);
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
