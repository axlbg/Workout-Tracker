import { Component, inject, ViewChild } from '@angular/core';

import { CommonModule } from '@angular/common';
import { StepperModule } from 'primeng/stepper';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { StepsModule } from 'primeng/steps';

import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApiWorkoutService } from '../../../services/api-workout.service';
import { DayOfWeek } from '../../../class/workoutPerDay';
import { Workout } from '../../../class/workout';
import { createWorkoutRequest } from '../../../class/createWorkoutRequest';
import { CreateStepOneComponent } from '../create-step-one/create-step-one.component';
import { CreateStepTwoComponent } from '../create-step-two/create-step-two.component';
import { CreateStepThreeComponent } from '../create-step-three/create-step-three.component';
import { LoadingComponent } from '../../shared/loading/loading.component';
import { ToastService } from '../../../services/toast.service';

@Component({
  selector: 'app-create-main',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    StepperModule,
    ButtonModule,
    InputTextModule,
    FormsModule,
    CardModule,
    CreateStepOneComponent,
    StepsModule,
    CreateStepTwoComponent,
    CreateStepThreeComponent,
    LoadingComponent,
  ],
  templateUrl: './create-main.component.html',
  styleUrl: './create-main.component.css',
})
export class CreateMainComponent {
  @ViewChild(CreateStepOneComponent) stepOneComponent!: CreateStepOneComponent;
  @ViewChild(CreateStepTwoComponent) stepTwoComponent!: CreateStepTwoComponent;
  @ViewChild(CreateStepThreeComponent)
  stepThreeComponent!: CreateStepThreeComponent;
  stepsItems = [
    { label: 'Name & Icon' },
    { label: ' ', disabled: true },
    { label: '', disabled: true },
  ];
  stepsActiveIndex = 0;

  showLoading: boolean = false;

  startDate!: string;
  endDate!: string;

  days: DayOfWeek[] = [];
  workout: Workout;

  private readonly router = inject(Router);
  constructor(
    private apiWorkout: ApiWorkoutService,
    private toastService: ToastService
  ) {
    this.workout = new Workout('', []);
  }

  onActiveIndexChange(index: any) {
    this.stepsActiveIndex = index;
    this.changeStepsLabel();
  }

  clickBack(): boolean {
    if (this.stepsActiveIndex == 0) return false;
    this.stepsActiveIndex--;
    this.changeStepsLabel();
    return true;
  }

  clickNext(): boolean {
    switch (this.stepsActiveIndex) {
      case 0:
        if (!this.submitStepOne()) return false;
        this.stepsActiveIndex++;
        break;
      case 1:
        if (!this.submitStepTwo()) return false;
        this.stepsActiveIndex++;
        break;
    }
    this.changeStepsLabel();
    return true;
  }

  submitStepOne(): boolean {
    if (!this.stepOneComponent.isValid()) {
      return false;
    }
    const data = this.stepOneComponent.getData();
    this.workout.name = data.name;
    this.workout.icon = data.icon;

    return true;
  }

  submitStepTwo(): boolean {
    if (!this.stepTwoComponent.isValid()) {
      return false;
    }
    const data = this.stepTwoComponent.getData();
    /* ------------------- date ------------------------ */
    const startDate = data.startDate;
    let endDate = new Date(data.startDate);
    const duration = data.duration;
    endDate.setDate(endDate.getDate() + duration); // add duration
    // Format to ISO (YYYY-MM-DD)
    const startDateISO = startDate.toISOString().split('T')[0];
    const endDateISO = endDate.toISOString().split('T')[0];
    /* ------------------------------------------------- */
    this.startDate = startDateISO;
    this.endDate = endDateISO;
    this.days = data.days;
    this.days.sort((a, b) => a - b);

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

  submitStepThree(): void {
    this.workout.workoutPerDays = this.stepThreeComponent.getData();

    this.finishCreate();
  }

  finishCreate(): void {
    this.showLoading = true;
    this.toastService.showLoading();
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
      next: () => {
        this.showLoading = false;
        this.toastService.hideLoading();
        this.toastService.showSuccess('Workout successfully created.');
        this.router.navigateByUrl('/my-workouts');
      },
      error: (error) => {
        console.error(error.message || 'Unexpected error');
        this.showLoading = false;
        this.toastService.hideLoading();
      },
    });
  }
}
