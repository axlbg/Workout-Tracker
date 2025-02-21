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

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [NavbarComponent, CreateDailyComponent, ReactiveFormsModule],
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css', '../../styles/forms.css'],
})
export class CreateComponent {
  workoutForm: FormGroup;
  touchedSubmit: boolean = false;

  private readonly router = inject(Router);
  constructor(private fb: FormBuilder, private apiWorkout: ApiWorkoutService) {
    this.workoutForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  onSubmit() {
    this.touchedSubmit = true;
    if (this.workoutForm.valid) {
      this.apiWorkout
        .createWorkout(this.workoutForm.value)
        .subscribe((response: any) => {
          console.log(response);
        });
    }
  }
}
