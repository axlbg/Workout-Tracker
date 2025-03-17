import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { AuthService } from './auth.service';
import { Exercise } from '../class/exercise';
import { GuestService } from './guest.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiWorkoutService {
  private apiUrl = environment.apiUrl + '/api';

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private guestService: GuestService
  ) {}

  createWorkout(postData: any): Observable<any> {
    if (this.guestService.isGuestMode()) {
      return of(null);
    }

    const headers = this.generateHeader();

    return this.http.post(`${this.apiUrl}/workout`, postData, { headers });
  }

  getWorkouts(): Observable<any> {
    if (this.guestService.isGuestMode()) {
      return this.guestService.getWorkouts();
    }

    const headers = this.generateHeader();
    return this.http.get(`${this.apiUrl}/workout`, { headers });
  }

  updateExerciseCompleted(id: number, completed: boolean): Observable<any> {
    if (this.guestService.isGuestMode()) {
      console.log('uno');
      return of(null);
    }

    const headers = this.generateHeader();
    return this.http.patch(`${this.apiUrl}/exercises/${id}`, completed, {
      headers,
    });
  }

  updateExercise(exercise: Exercise): Observable<any> {
    if (this.guestService.isGuestMode()) {
      console.log('dos');
      return of(null);
    }

    const headers = this.generateHeader();
    return this.http.put(`${this.apiUrl}/exercises/${exercise.id}`, exercise, {
      headers,
    });
  }

  private generateHeader(): HttpHeaders {
    const token = this.authService.getToken();

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    return headers;
  }
}
