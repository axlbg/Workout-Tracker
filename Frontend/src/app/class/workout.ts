import { WorkoutPerDay } from './workoutPerDay';

export class Workout {
  public id?: number | null;
  public name: string;
  public workoutPerDays: WorkoutPerDay[] | null;

  public constructor(
    name: string,
    workoutPerDays: WorkoutPerDay[] | null,
    id?: number
  ) {
    this.id = id;
    this.name = name;
    this.workoutPerDays = workoutPerDays;
  }
}
