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

export class WorkoutPerDay {
  public dayOfWeek: DayOfWeek;
  public exercises: Exercise[];
  public date: Date;

  public constructor(
    dayOfWeek: DayOfWeek,
    exercises: Exercise[] = [],
    date: Date = new Date()
  ) {
    this.dayOfWeek = dayOfWeek;
    this.exercises = exercises;
    this.date = date;
  }
}
