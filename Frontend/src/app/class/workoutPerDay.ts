import { Exercise } from './exercise';

export enum DayOfWeek {
  MONDAY,
  TUESDAY,
  WEDNESDAY,
  THURSDAY,
  FRIDAY,
  SATURDAY,
  SUNDAY,
}

export interface Day {
  name: string;
  dayOfWeek: DayOfWeek;
}

export class WorkoutPerDay {
  public dayOfWeek: DayOfWeek;
  public exercises: Exercise[] | null;

  public constructor(dayOfWeek: DayOfWeek, exercises: Exercise[] = []) {
    this.dayOfWeek = dayOfWeek;
    this.exercises = exercises;
  }
}
