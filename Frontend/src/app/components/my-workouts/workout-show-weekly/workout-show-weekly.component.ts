import { Component, Input, OnInit } from '@angular/core';
import { Workout } from '../../../class/workout';
import { CommonModule } from '@angular/common';
import { DailyCardComponent } from '../daily-card/daily-card.component';

@Component({
  selector: 'app-workout-show-weekly',
  standalone: true,
  imports: [DailyCardComponent, CommonModule, DailyCardComponent],
  templateUrl: './workout-show-weekly.component.html',
  styleUrl: './workout-show-weekly.component.css',
})
export class WorkoutShowWeeklyComponent implements OnInit {
  @Input({ required: true, alias: 'workoutToShow' }) workout!: Workout;

  ngOnInit(): void {
    this.workout.workoutPerDays.sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );
  }
  generateHeader(day: string, date: Date) {
    return `${day}, ${date}`;
  }
}
