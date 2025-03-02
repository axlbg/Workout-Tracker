import { Component } from '@angular/core';
import { ShowDailyComponent } from '../../components/show-daily/show-daily.component';
import { WorkoutPerDay } from '../../class/workoutPerDay';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { ApiWorkoutService } from '../../services/api-workout.service';
import { Workout } from '../../class/workout';

@Component({
  selector: 'app-daily',
  standalone: true,
  imports: [ShowDailyComponent, NavbarComponent],
  templateUrl: './daily.component.html',
  styleUrl: './daily.component.css',
})
export class DailyComponent {
  day: WorkoutPerDay | null = null;

  constructor(private apiWorkout: ApiWorkoutService) {
    this.findWorkouts();
  }

  findWorkouts() {
    this.apiWorkout.getWorkouts().subscribe((workouts) => {
      if (workouts) this.day = this.filterByToday(workouts);
    });
  }

  markAllExercisesAsCompleted() {
    if (this.day && this.day.exercises) {
      this.day.exercises.forEach((exercise) => {
        exercise.completed = true;
        this.apiWorkout.updateExercisesCompleted(exercise, true);
      });
    }
  }

  private filterByToday(workouts: Workout[]): WorkoutPerDay | null {
    let today = new Date();
    let returnWpd = null;
    for (const w of workouts) {
      if (w.workoutPerDays) {
        for (const wpd of w.workoutPerDays) {
          if (wpd.date && this.isSameDay(new Date(wpd.date), today)) {
            returnWpd = wpd;
            break;
          }
        }
      }
      if (returnWpd) break;
    }
    return returnWpd;
  }

  private isSameDay(date1: Date, date2: Date): boolean {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  }
}
