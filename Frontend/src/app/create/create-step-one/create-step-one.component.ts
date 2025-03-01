import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { IconService } from '../../services/icon.service';
import { Workout } from '../../class/workout';
import { FloatLabelModule } from 'primeng/floatlabel';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-create-step-one',
  standalone: true,
  imports: [
    ButtonModule,
    FloatLabelModule,
    ReactiveFormsModule,
    InputTextModule,
  ],
  templateUrl: './create-step-one.component.html',
  styleUrls: [
    './create-step-one.component.css',
    '../../styles/forms.css',
    '../../styles/icon.css',
  ],
})
export class CreateStepOneComponent {
  @Input({ required: true }) workout!: Workout;
  @Output() eventRefreshWorkout = new EventEmitter<Workout>();
  form: FormGroup;
  touchedSubmit: boolean = false;

  public iconService = inject(IconService);
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  selectedIndex: number = 0;
  selectIcon(index: number) {
    this.selectedIndex = index;
    this.workout.icon = index;
  }

  onSubmitFirstStep() {
    this.touchedSubmit = true;
  }

  checkForm(): boolean {
    if (this.form.valid) {
      this.workout.name = this.form.value.name;
      this.eventRefreshWorkout.emit(this.workout);
      return true;
    }
    return false;
  }

  getData() {
    return this.form.value;
  }
  isValid(): boolean {
    return this.form.valid;
  }
}
