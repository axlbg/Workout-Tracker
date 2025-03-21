import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CardModule } from 'primeng/card';
import { Exercise, MuscleGroup } from '../../../class/exercise';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { FloatLabelModule } from 'primeng/floatlabel';
import { SelectModule } from 'primeng/select';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { MessageModule } from 'primeng/message';
import { ApiWorkoutService } from '../../../services/api-workout.service';
import { ToastService } from '../../../services/toast.service';

@Component({
  selector: 'app-exercise-edit-card',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    InputTextModule,
    ReactiveFormsModule,
    DropdownModule,
    InputTextModule,
    ButtonModule,
    CheckboxModule,
    DropdownModule,
    FloatLabelModule,
    SelectModule,
    ToggleButtonModule,
    MessageModule,
  ],
  templateUrl: './exercise-edit-card.component.html',
  styleUrl: './exercise-edit-card.component.css',
})
export class ExerciseEditCardComponent implements OnInit {
  @Input({ required: false }) exercise!: Exercise;
  @Input({ required: false }) isCreating: boolean = false;

  onClickSaveExercise = output();
  onClickCancel = output();
  touchedSubmit = false;

  muscleGroups = Object.keys(MuscleGroup).map((key) => ({
    label: key.charAt(0).toUpperCase() + key.slice(1).toLowerCase(), // Capitalize first letter
    value: key,
  }));

  form: FormGroup;
  constructor(
    private fb: FormBuilder,
    private apiWorkout: ApiWorkoutService,
    private toastService: ToastService
  ) {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      sets: [null, [Validators.required, Validators.min(0)]],
      reps: [null, [Validators.required, Validators.min(0)]],
      weight: [null, [Validators.required, Validators.min(0)]],
      rir: [null, [Validators.required, Validators.min(0)]],
      muscleGroup: [MuscleGroup.BACK, [Validators.required]],
    });

    if (!this.exercise) {
      this.exercise = new Exercise('New exercise');
    }
  }

  ngOnInit() {
    if (this.exercise) {
      this.form.setValue({
        name: this.exercise.name,
        sets: this.exercise.sets,
        reps: this.exercise.reps,
        weight: this.exercise.weight,
        rir: this.exercise.rir,
        muscleGroup: this.exercise.muscleGroup,
      });
    }
  }

  saveExercise() {
    if (this.form.valid) {
      this.exercise.name = this.form.value.name;
      this.exercise.sets = this.form.value.sets;
      this.exercise.reps = this.form.value.reps;
      this.exercise.weight = this.form.value.weight;
      this.exercise.rir = this.form.value.rir;
      this.exercise.muscleGroup = this.form.value.muscleGroup;

      this.updateExercise(this.exercise);
    } else {
      this.touchedSubmit = true;
    }
  }

  cancel() {
    this.onClickCancel.emit();
  }

  private updateExercise(exercise: Exercise) {
    if (!this.isCreating) {
      this.toastService.showLoading();
      this.apiWorkout.updateExercise(exercise).subscribe(() => {
        this.onClickSaveExercise.emit();
        this.toastService.hideLoading();
      });
    } else {
      this.onClickSaveExercise.emit();
    }
  }
}
