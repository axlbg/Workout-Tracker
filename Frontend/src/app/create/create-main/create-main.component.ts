import { Component, inject, ViewChild } from '@angular/core';

import { CommonModule } from '@angular/common';
import { CarouselModule } from 'primeng/carousel';
import { StepperModule } from 'primeng/stepper';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { StepsModule } from 'primeng/steps';

import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApiWorkoutService } from '../../services/api-workout.service';
import { WorkoutPerDay, DayOfWeek } from '../../class/workoutPerDay';
import { Workout } from '../../class/workout';
import { createWorkoutRequest } from '../../class/createWorkoutRequest';
import { CreateStepOneComponent } from '../create-step-one/create-step-one.component';
import { CreateStepTwoComponent } from '../create-step-two/create-step-two.component';
import { CreateDailyComponent } from '../../components/create-daily/create-daily.component';

@Component({
  selector: 'app-create-main',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CreateDailyComponent,
    CarouselModule,
    CommonModule,
    StepperModule,
    ButtonModule,
    InputTextModule,
    FormsModule,
    CardModule,
    CreateStepOneComponent,
    StepsModule,
    CreateStepTwoComponent,
  ],
  templateUrl: './create-main.component.html',
  styleUrl: './create-main.component.css',
})
export class CreateMainComponent {
  @ViewChild(CreateStepOneComponent) stepOneComponent!: CreateStepOneComponent;
  stepsItems = [
    { label: 'Name & Icon' },
    { label: ' ', disabled: true },
    { label: '', disabled: true },
  ];
  stepsActiveIndex = 0;

  startDate!: string;
  endDate!: string;

  days: DayOfWeek[] = [DayOfWeek.FRIDAY, DayOfWeek.MONDAY];
  workout: Workout;
  workoutPerDays: WorkoutPerDay[] = [];

  private readonly router = inject(Router);
  constructor(private apiWorkout: ApiWorkoutService) {
    this.workout = new Workout('', null);
  }

  onActiveIndexChange(index: any) {
    this.stepsActiveIndex = index;
    this.changeStepsLabel();
  }

  clickNext(): boolean {
    switch (this.stepsActiveIndex) {
      case 0:
        if (!this.stepOneComponent.isValid()) {
          return false;
        }
        //console.log(this.stepOneComponent.getData());
        this.stepsActiveIndex++;
        break;
      case 1:
        this.stepsActiveIndex++;
        break;
    }
    this.changeStepsLabel();
    //this.stepsItems[this.stepsActiveIndex].disabled = false;
    return true;
  }

  clickBack(): boolean {
    if (this.stepsActiveIndex == 0) return false;
    this.stepsActiveIndex--;
    this.changeStepsLabel();
    return true;
  }

  changeStepsLabel(): void {
    switch (this.stepsActiveIndex) {
      case 0:
        this.stepsItems = [
          { label: 'Name & Icon' },
          { label: ' ', disabled: true },
          { label: '', disabled: true },
        ];
        break;
      case 1:
        this.stepsItems = [
          { label: ' ' },
          { label: 'Choose Days' },
          { label: '', disabled: true },
        ];
        break;
      case 2:
        this.stepsItems = [
          { label: ' ' },
          { label: '' },
          { label: 'Daily Routine' },
        ];
    }
  }

  eventRefreshWorkoutPerDay(workoutPerDay: WorkoutPerDay) {
    const index = this.workoutPerDays.findIndex(
      (wpd) => wpd.dayOfWeek === workoutPerDay.dayOfWeek
    );

    if (index !== -1) {
      //exists
      this.workoutPerDays[index] = { ...workoutPerDay };
    } else {
      this.workoutPerDays.push(workoutPerDay);
    }
  }
  eventRefreshWorkout(workout: Workout) {
    this.workout = workout;
  }

  clickFinishCreate(): void {
    //this.showLoading = true;
    this.workout.workoutPerDays = this.workoutPerDays;
    // Create request
    const workoutRequest = new createWorkoutRequest(
      this.workout,
      this.startDate,
      this.endDate,
      this.days
    );
    const workoutRequestJson = JSON.stringify(workoutRequest); // convert class to json
    /* ------------------------------------------------- */

    this.apiWorkout.createWorkout(workoutRequestJson).subscribe({
      next: (response: any) => {
        console.log(response);
        //this.showLoading = false;
        this.router.navigateByUrl('/my-workouts');
      },
      error: (error) => {
        console.error(error.message || 'Unexpected error');
        // this.showLoading = false;
      },
    });
  }
}
