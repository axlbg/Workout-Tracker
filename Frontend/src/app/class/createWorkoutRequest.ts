import { Workout } from './workout';
import { WorkoutPerDay } from './workoutPerDay';

export class createWorkoutRequest {
  public id: number | null;
  public name: string;
  public startDate: string;
  public endDate: string;
  public daysOfWeek: number[];
  public workoutPerDays: WorkoutPerDay[] | null;

  constructor(
    workout: Workout,
    startDate: string,
    endDate: string,
    daysOfWeek: number[]
  ) {
    this.id = workout.id ? workout.id : null;
    this.name = workout.name;
    this.workoutPerDays = workout.workoutPerDays
      ? workout.workoutPerDays
      : null;

    this.startDate = startDate;
    this.endDate = endDate;
    this.daysOfWeek = daysOfWeek;
  }
}
