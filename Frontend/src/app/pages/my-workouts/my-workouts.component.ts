import { Component, inject } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { ApiWorkoutService } from '../../services/api-workout.service';
import { Workout } from '../../class/workout';
import { CommonModule } from '@angular/common';
import { ShowWorkoutComponent } from '../../components/show-workout/show-workout.component';
import { IconService } from '../../services/icon.service';

@Component({
  selector: 'app-my-workouts',
  imports: [NavbarComponent, CommonModule, ShowWorkoutComponent],
  templateUrl: './my-workouts.component.html',
  styleUrls: ['./my-workouts.component.css', '../../styles/icon.css'],
})
export class MyWorkoutsComponent {
  workouts: Workout[] = [];
  workoutToShow!: Workout;
  show = false;

  public iconService = inject(IconService);
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
