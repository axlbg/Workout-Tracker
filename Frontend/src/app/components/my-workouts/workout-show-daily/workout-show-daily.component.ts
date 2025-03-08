import { Component, Input, OnInit } from '@angular/core';
import { Workout } from '../../../class/workout';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { DirectionArrowButtonComponentComponent } from '../direction-arrow-button-component/direction-arrow-button-component.component';
import {
  animate,
  sequence,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { DailyCardComponent } from '../daily-card/daily-card.component';
import { CustomDateFormatPipe } from '../../../pipes/custom-date-format.pipe';

@Component({
  selector: 'app-workout-show-daily',
  imports: [
    CommonModule,
    CardModule,
    DirectionArrowButtonComponentComponent,
    DailyCardComponent,
    CustomDateFormatPipe,
  ],
  templateUrl: './workout-show-daily.component.html',
  styleUrl: './workout-show-daily.component.css',
  animations: [
    trigger('messageChange', [
      transition(':increment', [
        sequence([
          animate('0.1s ease-out', style({ transform: 'translateX(-100%)' })),
          style({ transform: 'translateX(100%)' }),
          animate('0.1s ease-in', style({ transform: 'translateX(0)' })),
        ]),
      ]),
      transition(':decrement', [
        sequence([
          animate('0.1s ease-out', style({ transform: 'translateX(100%)' })),
          style({ transform: 'translateX(-100%)' }),
          animate('0.1s ease-in', style({ transform: 'translateX(0)' })),
        ]),
      ]),
    ]),
  ],
})
export class WorkoutShowDailyComponent implements OnInit {
  @Input({ required: true, alias: 'workoutToShow' }) workout!: Workout;

  currentIndex: number = 0;
  messageDate: string = '';

  constructor() {}

  ngOnInit() {
    this.messageDate =
      this.workout.workoutPerDays[this.currentIndex].date?.toString();

    this.workout.workoutPerDays.sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );
  }

  eventChangeMsg(direction: string) {
    let newIndex;
    if (direction === 'left') {
      newIndex = this.currentIndex - 1;
      if (newIndex >= 0) this.currentIndex = newIndex;
    } else {
      newIndex = this.currentIndex + 1;
      if (newIndex < this.workout.workoutPerDays.length)
        this.currentIndex = newIndex;
    }
    this.messageDate =
      this.workout.workoutPerDays[this.currentIndex].date.toString();
  }
}
