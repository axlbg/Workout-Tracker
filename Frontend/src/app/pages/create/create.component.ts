import { Component, inject } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
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
import { IconService } from '../../services/icon.service';
import { LoadingComponent } from '../../components/loading/loading.component';
import { DatePickerModule } from 'primeng/datepicker';
import { SelectModule } from 'primeng/select';

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
    LoadingComponent,
    FormsModule,
    DatePickerModule,
    SelectModule,
  ],
  templateUrl: './create.component.html',
  styleUrls: [
    './create.component.css',
    '../../styles/forms.css',
    '../../styles/icon.css',
  ],
})
export class CreateComponent {
  workoutForm: FormGroup;
  touchedSubmit: boolean = false;

  days!: DayOfWeek[];
  workout: Workout;
  workoutPerDays: WorkoutPerDay[] = [];

  selectedIndex: number = 0;
  showLoading: boolean = false;

  selectedDate: Date = new Date();
  minDate: Date = new Date(); // today

  durationOptions: { label: string; value: number }[] = [
    { label: '4 weeks', value: 4 * 7 },
    { label: '8 weeks', value: 8 * 7 },
    { label: '12 weeks', value: 12 * 7 },
  ];
  selectedDuration!: { label: string; value: number };

  private readonly router = inject(Router);
  public iconService = inject(IconService);
  constructor(private fb: FormBuilder, private apiWorkout: ApiWorkoutService) {
    this.workoutForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
    });
    this.workout = new Workout('', null);

    this.minDate.setDate(this.minDate.getDate() - 1);
  }

  eventDaysChange(days: DayOfWeek[]): void {
    this.days = days;
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

  selectIcon(index: number) {
    this.selectedIndex = index;
    this.workout.icon = index;
  }

  onSubmitFirstStep() {
    this.touchedSubmit = true;
  }

  checkForm(): boolean {
    if (this.workoutForm.valid) {
      this.workout.name = this.workoutForm.value.name;
      return true;
    }
    return false;
  }

  clickFinishCreate(): void {
    this.showLoading = true;
    this.workout.workoutPerDays = this.workoutPerDays;
    /* ------------------- date ------------------------ */
    const startDate = this.selectedDate;
    let endDate = new Date(this.selectedDate);
    const duration = this.selectedDuration.value;
    endDate.setDate(endDate.getDate() + duration); // add duration by selection
    // Format to ISO (YYYY-MM-DD)
    const startDateISO = startDate.toISOString().split('T')[0];
    const endDateISO = endDate.toISOString().split('T')[0];
    /* ------------------------------------------------- */
    // Create request
    const workoutRequest = new createWorkoutRequest(
      this.workout,
      startDateISO,
      endDateISO,
      this.days
    );
    const workoutRequestJson = JSON.stringify(workoutRequest); // convert class to json
    /* ------------------------------------------------- */

    this.apiWorkout.createWorkout(workoutRequestJson).subscribe({
      next: (response: any) => {
        console.log(response);
        this.showLoading = false;
        this.router.navigateByUrl('/my-workouts');
      },
      error: (error) => {
        console.error(error.message || 'Unexpected error');
        this.showLoading = false;
      },
    });
  }
}
