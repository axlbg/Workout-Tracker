import { Component, inject } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { Workout } from '../../class/workout';
import { CommonModule } from '@angular/common';
import { ShowWorkoutComponent } from '../../components/my-workouts/show-workout/show-workout.component';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { PanelModule } from 'primeng/panel';
import { SelectWorkoutComponent } from '../../components/shared/select-workout/select-workout.component';

@Component({
  selector: 'app-my-workouts',
  standalone: true,
  imports: [
    NavbarComponent,
    CommonModule,
    ShowWorkoutComponent,
    CardModule,
    DividerModule,
    PanelModule,
    SelectWorkoutComponent,
  ],
  templateUrl: './my-workouts.component.html',
  styleUrl: './my-workouts.component.css',
})
export class MyWorkoutsComponent {
  workoutToShow!: Workout;
  showOneWorkout = false;

  eventShowWorkout(workout: Workout) {
    this.workoutToShow = workout;
    this.showOneWorkout = true;
  }

  eventCloseWorkout() {
    this.showOneWorkout = false;
  }
}
