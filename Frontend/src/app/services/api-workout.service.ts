import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Exercise } from '../class/exercise';

@Injectable({
  providedIn: 'root',
})
export class ApiWorkoutService {
  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient, private authService: AuthService) {}

  createWorkout(postData: any): Observable<any> {
    const token = this.authService.getToken();

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    return this.http.post(`${this.apiUrl}/workout`, postData, { headers });
  }

  getWorkouts(): Observable<any> {
    const token = this.authService.getToken();

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    return this.http.get(`${this.apiUrl}/workout`, { headers });
  }

  updateExercisesCompleted(exercise: Exercise, completed: boolean) {
    //
  }
}
