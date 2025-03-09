import { CommonModule } from '@angular/common';
import { Component, Input, output } from '@angular/core';
import { DividerModule } from 'primeng/divider';
import { PanelModule } from 'primeng/panel';
import { Workout } from '../../../class/workout';
import { IconService } from '../../../services/icon.service';
import { ApiWorkoutService } from '../../../services/api-workout.service';
import { ToastService } from '../../../services/toast.service';
import { CardModule } from 'primeng/card';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-select-workout',
  imports: [CommonModule, DividerModule, PanelModule, CardModule, RouterLink],
  templateUrl: './select-workout.component.html',
  styleUrls: ['./select-workout.component.css', '../../../styles/icon.css'],
})
export class SelectWorkoutComponent {
  @Input({ required: true }) title!: string;
  eventShowWorkout = output<Workout>();
  eventCloseWorkout = output();

  workouts: Workout[] = [];
  showWorkout: boolean = false;
  workoutToShow!: Workout;

  constructor(
    private apiWorkout: ApiWorkoutService,
    private toastService: ToastService,
    public iconService: IconService
  ) {
    this.findWorkouts();
  }

  private findWorkouts() {
    this.toastService.showLoading();
    this.apiWorkout.getWorkouts().subscribe({
      next: (data) => {
        this.workouts = data;
        this.toastService.hideLoading();
      },
      error: (error) => {
        console.error('Error:', error);
        this.toastService.hideLoading();
      },
    });
  }

  openWorkout(workout: Workout) {
    this.showWorkout = true;
    this.workoutToShow = workout;
    this.eventShowWorkout.emit(workout);
  }

  closeWorkout() {
    this.showWorkout = false;
    this.eventCloseWorkout.emit();
  }
}
