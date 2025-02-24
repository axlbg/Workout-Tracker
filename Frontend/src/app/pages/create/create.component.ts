import { Component, inject } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ApiWorkoutService } from '../../services/api-workout.service';
import { CreateDailyComponent } from '../../components/create-daily/create-daily.component';
import { SelectDaysComponent } from '../../components/select-days/select-days.component';
import { CarouselModule } from 'primeng/carousel';
import { CommonModule } from '@angular/common';
import { StepperModule } from 'primeng/stepper';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { WorkoutPerDay, DayOfWeek } from '../../class/workoutPerDay';
import { Workout } from '../../class/workout';
import { createWorkoutRequest } from '../../class/createWorkoutRequest';

@Component({
  selector: 'app-create',
  imports: [
    NavbarComponent,
    ReactiveFormsModule,
    SelectDaysComponent,
    CreateDailyComponent,
    CarouselModule,
    CommonModule,
    StepperModule,
    ButtonModule,
    InputTextModule,
    FloatLabelModule,
  ],
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css', '../../styles/forms.css'],
})
export class CreateComponent {
  workoutForm: FormGroup;
  touchedSubmit: boolean = false;

  days!: DayOfWeek[];
  workout: Workout;
  workoutPerDays: WorkoutPerDay[] = [];

  private readonly router = inject(Router);
  constructor(private fb: FormBuilder, private apiWorkout: ApiWorkoutService) {
    this.workoutForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
    });
    this.workout = new Workout('', null);
  }

  eventDaysChange(days: DayOfWeek[]): void {
    this.days = days;
  }

  onSubmit() {
    this.touchedSubmit = true;
  }

  checkForm(): boolean {
    if (this.workoutForm.valid) {
      this.workout.name = this.workoutForm.value.name;
      return true;
    }
    return false;
  }

  finish(): void {
    this.workout.workoutPerDays = this.workoutPerDays;
    const startDate = new Date('2023-10-01');
    const endDate = new Date('2023-10-31');
    // Format to ISO (YYYY-MM-DD)
    const startDateISO = startDate.toISOString().split('T')[0];
    const endDateISO = endDate.toISOString().split('T')[0];

    // Create request
    const workoutRequest = new createWorkoutRequest(
      this.workout,
      startDateISO,
      endDateISO,
      this.days
    );
    const workoutRequestJson = JSON.stringify(workoutRequest); // convert class to json

    console.log(workoutRequest);

    this.apiWorkout
      .createWorkout(workoutRequestJson)
      .subscribe((response: any) => {
        console.log(response);
      });
  }

  refreshWorkoutPerDay(workoutPerDay: WorkoutPerDay) {
    const index = this.workoutPerDays.findIndex(
      (dw) => dw.dayOfWeek === workoutPerDay.dayOfWeek
    );

    if (index !== -1) {
      //exists
      this.workoutPerDays[index] = { ...workoutPerDay };
    } else {
      this.workoutPerDays.push(workoutPerDay);
    }
  }
}
