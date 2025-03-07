import { Component, inject } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { ApiWorkoutService } from '../../services/api-workout.service';
import { Workout } from '../../class/workout';
import { CommonModule } from '@angular/common';
import { ShowWorkoutComponent } from '../../components/my-workouts/show-workout/show-workout.component';
import { IconService } from '../../services/icon.service';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { ToastService } from '../../services/toast.service';
import { RouterLink } from '@angular/router';
import { PanelModule } from 'primeng/panel';

@Component({
  selector: 'app-my-workouts',
  standalone: true,
  imports: [
    NavbarComponent,
    CommonModule,
    ShowWorkoutComponent,
    CardModule,
    DividerModule,
    RouterLink,
    PanelModule,
  ],
  templateUrl: './my-workouts.component.html',
  styleUrls: ['./my-workouts.component.css', '../../styles/icon.css'],
})
export class MyWorkoutsComponent {
  workouts: Workout[] = [];
  workoutToShow!: Workout;
  showOneWorkout = false;

  public iconService = inject(IconService);
  constructor(
    private apiWorkout: ApiWorkoutService,
    private toastService: ToastService
  ) {
    this.findWorkouts();
  }

  findWorkouts() {
    this.toastService.showLoading();
    this.apiWorkout.getWorkouts().subscribe(
      (data) => {
        this.workouts = data;
        this.toastService.hideLoading();
      },
      (error) => {
        console.error('Error:', error);
        this.toastService.hideLoading();
      }
    );
  }

  openWorkout(workout: Workout) {
    this.workoutToShow = workout;
    this.showOneWorkout = true;
  }
}
