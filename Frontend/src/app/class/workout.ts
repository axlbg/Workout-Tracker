import { WorkoutPerDay } from './workoutPerDay';

export class Workout {
  public id?: number | null;
  public name: string;
  public icon: number;
  public workoutPerDays: WorkoutPerDay[] | null;

  public constructor(
    name: string,
    workoutPerDays: WorkoutPerDay[] | null,
    icon: number = 0,
    id?: number
  ) {
    this.id = id;
    this.name = name;
    this.icon = icon;
    this.workoutPerDays = workoutPerDays;
  }
}
