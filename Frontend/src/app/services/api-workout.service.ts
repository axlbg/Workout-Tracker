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
    const headers = this.generateHeader();

    return this.http.post(`${this.apiUrl}/workout`, postData, { headers });
  }

  getWorkouts(): Observable<any> {
    const headers = this.generateHeader();
    return this.http.get(`${this.apiUrl}/workout`, { headers });
  }

  updateExerciseCompleted(id: number, completed: boolean) {
    const headers = this.generateHeader();
    return this.http.patch(`${this.apiUrl}/exercises/${id}`, completed, {
      headers,
    });
  }

  updateExercise(exercise: Exercise) {
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
