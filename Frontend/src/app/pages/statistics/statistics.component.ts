import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { SelectWorkoutComponent } from '../../components/shared/select-workout/select-workout.component';
import { Workout } from '../../class/workout';
import { ShowStatisticsComponent } from '../../components/statistics/show-statistics/show-statistics.component';

@Component({
  selector: 'app-statistics',
  imports: [
    NavbarComponent,
    CommonModule,
    SelectWorkoutComponent,
    ShowStatisticsComponent,
  ],
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.css',
})
export class StatisticsComponent {
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
