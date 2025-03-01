import { Component, EventEmitter, Output } from '@angular/core';
import { FloatLabelModule } from 'primeng/floatlabel';
import { DatePickerModule } from 'primeng/datepicker';
import { FormsModule } from '@angular/forms';
import { DayOfWeek } from '../../class/workoutPerDay';
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
    FormsModule,
    SelectModule,
    SelectButtonModule,
    CommonModule,
    CheckboxModule,
  ],
  templateUrl: './create-step-two.component.html',
  styleUrl: './create-step-two.component.css',
})
export class CreateStepTwoComponent {
  selectedDate: Date = new Date();
  minDate: Date = new Date(); // today

  optionsDuration: { label: string; value: number }[] = [
    { label: '4 weeks', value: 4 * 7 },
    { label: '8 weeks', value: 8 * 7 },
    { label: '12 weeks', value: 12 * 7 },
  ];
  selectedDuration!: { label: string; value: number };

  optionsDays = [
    { name: 'Lunes', value: DayOfWeek.MONDAY },
    { name: 'Martes', value: DayOfWeek.TUESDAY },
    { name: 'Miércoles', value: DayOfWeek.WEDNESDAY },
    { name: 'Jueves', value: DayOfWeek.THURSDAY },
    { name: 'Viernes', value: DayOfWeek.FRIDAY },
    { name: 'Sábado', value: DayOfWeek.SATURDAY },
    { name: 'Domingo', value: DayOfWeek.SUNDAY },
  ];

  selectedDays!: DayOfWeek[];

  constructor() {
    this.minDate.setDate(this.minDate.getDate() - 1);
  }

  emitChanges() {
    /*
    /* ------------------- date ------------------------ /
    const startDate = this.selectedDate;
    let endDate = new Date(this.selectedDate);
    const duration = this.selectedDuration.value;
    endDate.setDate(endDate.getDate() + duration); // add duration by selection
    // Format to ISO (YYYY-MM-DD)
    const startDateISO = startDate.toISOString().split('T')[0];
    const endDateISO = endDate.toISOString().split('T')[0];
    /* ------------------------------------------------- */

    const days: DayOfWeek[] = this.selectedDays;
  }
}
