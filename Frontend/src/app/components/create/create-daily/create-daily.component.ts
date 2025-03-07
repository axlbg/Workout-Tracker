import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { Exercise, MuscleGroup } from '../../../class/exercise';
import { MuscleGroupPipe } from '../../../pipes/muscle-group.pipe';
import { FormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { DayOfWeek, WorkoutPerDay } from '../../../class/workoutPerDay';
import { DayOfWeekPipe } from '../../../pipes/day-of-week.pipe';

@Component({
  selector: 'app-create-daily',
  standalone: true,
  imports: [
    TableModule,
    CommonModule,
    ButtonModule,
    MuscleGroupPipe,
    FormsModule,
    SelectModule,
    DayOfWeekPipe,
  ],
  templateUrl: './create-daily.component.html',
  styleUrl: './create-daily.component.css',
})
export class CreateDailyComponent implements OnInit {
  @Input({ required: true }) day!: DayOfWeek;
  @Output() refreshWorkoutPerDay = new EventEmitter<WorkoutPerDay>();

  workoutPerDay!: WorkoutPerDay;
  exercises: Exercise[] = [];

  muscleGroups = Object.keys(MuscleGroup).map((key) => ({
    label: key.charAt(0).toUpperCase() + key.slice(1).toLowerCase(), // Capitalize first letter
    value: key,
  }));

  constructor() {}

  ngOnInit(): void {
    this.workoutPerDay = new WorkoutPerDay(this.day); // important to be here onInit
  }

  refreshWorkoutPerDayExercises(): void {
    this.workoutPerDay.exercises = this.exercises;
    this.refreshWorkoutPerDay.emit(this.workoutPerDay);
  }

  deleteExercise(exercise: any): void {
    this.exercises = this.exercises.filter((ex) => ex !== exercise);
    this.refreshWorkoutPerDayExercises();
  }

  addExercise(): void {
    let exercise = new Exercise('New exercise');
    this.exercises.push(exercise);
    this.refreshWorkoutPerDayExercises();
  }
}
