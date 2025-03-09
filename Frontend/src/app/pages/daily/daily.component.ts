import { Component } from '@angular/core';
import { ShowDailyComponent } from '../../components/show-daily/show-daily.component';
import { WorkoutPerDay } from '../../class/workoutPerDay';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { ApiWorkoutService } from '../../services/api-workout.service';
import { Workout } from '../../class/workout';
import { DividerModule } from 'primeng/divider';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-daily',
  standalone: true,
  imports: [ShowDailyComponent, NavbarComponent, DividerModule],
  templateUrl: './daily.component.html',
  styleUrl: './daily.component.css',
})
export class DailyComponent {
  day: WorkoutPerDay | null = null;

  constructor(
    private apiWorkout: ApiWorkoutService,
    private toastService: ToastService
  ) {
    this.findWorkouts();
  }

  findWorkouts() {
    this.toastService.showLoading();
    this.apiWorkout.getWorkouts().subscribe({
      next: (workouts) => {
        if (workouts) this.day = this.filterByToday(workouts);

        this.toastService.hideLoading();
      },
      error: () => {
        this.toastService.hideLoading();
      },
    });
  }

  markAllExercisesAsCompleted() {
    if (this.day && this.day.exercises) {
      this.day.exercises.forEach((exercise) => {
        if (exercise.id != null) {
          exercise.completed = true;
          this.apiWorkout
            .updateExerciseCompleted(exercise.id, true)
            .subscribe();
        }
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
