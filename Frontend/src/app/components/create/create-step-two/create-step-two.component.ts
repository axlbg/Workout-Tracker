import { Component } from '@angular/core';
import { FloatLabelModule } from 'primeng/floatlabel';
import { DatePickerModule } from 'primeng/datepicker';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DayOfWeek } from '../../../class/workoutPerDay';
import { SelectModule } from 'primeng/select';
import { SelectButtonModule } from 'primeng/selectbutton';
import { CommonModule } from '@angular/common';
import { CheckboxModule } from 'primeng/checkbox';

@Component({
  selector: 'app-create-step-two',
  standalone: true,
  imports: [
    FloatLabelModule,
    DatePickerModule,
    SelectModule,
    SelectButtonModule,
    CommonModule,
    CheckboxModule,
    ReactiveFormsModule,
  ],
  templateUrl: './create-step-two.component.html',
  styleUrl: './create-step-two.component.css',
})
export class CreateStepTwoComponent {
  optionsDuration: { label: string; value: number }[] = [
    { label: '4 weeks', value: 4 * 7 },
    { label: '8 weeks', value: 8 * 7 },
    { label: '12 weeks', value: 12 * 7 },
  ];

  optionsDays = [
    { name: 'Lunes', value: DayOfWeek.MONDAY },
    { name: 'Martes', value: DayOfWeek.TUESDAY },
    { name: 'Miércoles', value: DayOfWeek.WEDNESDAY },
    { name: 'Jueves', value: DayOfWeek.THURSDAY },
    { name: 'Viernes', value: DayOfWeek.FRIDAY },
    { name: 'Sábado', value: DayOfWeek.SATURDAY },
    { name: 'Domingo', value: DayOfWeek.SUNDAY },
  ];

  form: FormGroup;
  touchedSubmit: boolean = false;

  minDate: Date = new Date();

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      days: [[], [Validators.required]],
      startDate: [new Date(), [Validators.required]],
      duration: [null, [Validators.required]],
    });
    this.minDate.setDate(this.minDate.getDate() - 1);
  }

  isValid(): boolean {
    this.touchedSubmit = true;
    return this.form.valid;
  }

  getData() {
    this.touchedSubmit = true;
    return this.form.value;
  }
}
