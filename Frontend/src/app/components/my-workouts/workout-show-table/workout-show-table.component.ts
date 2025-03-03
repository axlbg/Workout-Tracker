import { Component, Input } from '@angular/core';
import { Workout } from '../../../class/workout';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { SelectModule } from 'primeng/select';
import { FormsModule } from '@angular/forms';
import { Exercise, MuscleGroup } from '../../../class/exercise';
import { MuscleGroupPipe } from '../../../pipes/muscle-group.pipe';
import { ButtonModule } from 'primeng/button';
import { DayOfWeek, WorkoutPerDay } from '../../../class/workoutPerDay';

@Component({
  selector: 'app-workout-show-table',
  standalone: true,
  imports: [TableModule, CommonModule, SelectModule, FormsModule, ButtonModule],
  templateUrl: './workout-show-table.component.html',
  styleUrl: './workout-show-table.component.css',
})
export class WorkoutShowTableComponent {
  @Input({ required: true, alias: 'workoutToShow' }) workout: Workout =
    new Workout(
      'Default Workout',
      [
        new WorkoutPerDay(DayOfWeek.MONDAY, [new Exercise('Push-up', {})]),
        new WorkoutPerDay(DayOfWeek.TUESDAY, [new Exercise('Squat', {})]),
      ],
      0
    );

  rowStyle(exercise: Exercise) {
    /*  return {
      'background-color': exercise.completed ? 'green' : 'red',
    };*/
    return {};
  }

  /*
  MuscleGroupLabels: Record<MuscleGroup, string> = {
    [MuscleGroup.BACK]: 'Back',
    [MuscleGroup.CHEST]: 'Chest',
    [MuscleGroup.SHOULDERS]: 'Shoulders',
    [MuscleGroup.BICEPS]: 'Biceps',
    [MuscleGroup.TRICEPS]: 'Triceps',
    [MuscleGroup.LEGS]: 'Legs',
    [MuscleGroup.CORE]: 'Core',
    [MuscleGroup.CARDIO]: 'Cardio',
  };
  muscleGroups = Object.values(MuscleGroup)
    .filter((value) => typeof value === 'number')
    .map((value) => ({
      label: this.MuscleGroupLabels[value as MuscleGroup],
      value,
    }));

  refreshWorkoutPerDayExercises(): void {
    //this.workoutPerDay.exercises = this.exercises;
    //this.refreshWorkoutPerDay.emit(this.workoutPerDay);
  }

  deleteExercise(exercise: any): void {
    // this.exercises = this.exercises.filter((ex) => ex !== exercise);
    this.refreshWorkoutPerDayExercises();
    console.log(this.workout, 2);
  }*/
}
