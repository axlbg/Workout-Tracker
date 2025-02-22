import { WorkoutPerDay } from './workoutPerDay';

export class Workout {
  public name: string;
  public workoutPerDays: WorkoutPerDay[] | null;

  public constructor(name: string, workoutPerDays: WorkoutPerDay[] | null) {
    this.name = name;
    this.workoutPerDays = workoutPerDays;
  }
}
