import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ExerciseCardComponent } from '../../shared/exercise-card/exercise-card.component';
import { ExerciseEditCardComponent } from '../../shared/exercise-edit-card/exercise-edit-card.component';
import { DayOfWeek, WorkoutPerDay } from '../../../class/workoutPerDay';
import { Exercise } from '../../../class/exercise';
import { ButtonModule } from 'primeng/button';
import { DayOfWeekPipe } from '../../../pipes/day-of-week.pipe';

@Component({
  selector: 'app-create-daily-mobile',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    ExerciseCardComponent,
    ExerciseEditCardComponent,
    ButtonModule,
    DayOfWeekPipe,
  ],
  templateUrl: './create-daily-mobile.component.html',
  styleUrl: './create-daily-mobile.component.css',
})
export class CreateDailyMobileComponent implements OnInit {
  @Input({ required: true }) day!: DayOfWeek;
  @Output() refreshWorkoutPerDay = new EventEmitter<WorkoutPerDay>();

  workoutPerDay!: WorkoutPerDay;
  exercises: Exercise[] = [];

  showExerciseEdit = false;
  exerciseToEdit!: Exercise;

  constructor() {}

  ngOnInit(): void {
    this.workoutPerDay = new WorkoutPerDay(this.day); // important to be here onInit
  }

  onClickEditExercise(exercise: Exercise) {
    this.exerciseToEdit = exercise;
    this.showExerciseEdit = true;
  }

  onClickCloseEdit() {
    this.showExerciseEdit = false;
  }

  onClickSaveExercise() {
    this.showExerciseEdit = false;
    this.refreshWorkoutPerDayExercises();
  }

  addExercise(): void {
    let exercise = new Exercise('New exercise');
    this.exercises.push(exercise);
    this.refreshWorkoutPerDayExercises();
  }

  deleteExercise(exercise: any): void {
    this.exercises = this.exercises.filter((ex) => ex !== exercise);
    this.refreshWorkoutPerDayExercises();
  }

  private refreshWorkoutPerDayExercises(): void {
    this.workoutPerDay.exercises = this.exercises;
    this.refreshWorkoutPerDay.emit(this.workoutPerDay);
  }
}
