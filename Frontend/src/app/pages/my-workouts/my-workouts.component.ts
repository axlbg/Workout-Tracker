import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { ApiWorkoutService } from '../../services/api-workout.service';
import { Workout } from '../../class/workout';
import { CommonModule } from '@angular/common';
import { ShowWorkoutComponent } from '../../components/show-workout/show-workout.component';

@Component({
  selector: 'app-my-workouts',
  imports: [NavbarComponent, CommonModule, ShowWorkoutComponent],
  templateUrl: './my-workouts.component.html',
  styleUrl: './my-workouts.component.css',
})
export class MyWorkoutsComponent {
  workouts: Workout[] = [];
  workoutToShow!: Workout;
  show = false;

  constructor(private apiWorkout: ApiWorkoutService) {
    this.findWorkouts();
  }

  findWorkouts() {
    this.apiWorkout.getWorkouts().subscribe((data) => {
      this.workouts = data;
      console.log(this.workouts);
    });
  }

  openWorkout(workout: Workout) {
    this.workoutToShow = workout;
    this.show = true;
  }
}
