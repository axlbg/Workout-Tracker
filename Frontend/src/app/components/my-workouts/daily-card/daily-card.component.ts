import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { WorkoutPerDay } from '../../../class/workoutPerDay';
import { CardModule } from 'primeng/card';
import { Exercise } from '../../../class/exercise';
import { ExerciseCardComponent } from '../../shared/exercise-card/exercise-card.component';

@Component({
  selector: 'app-daily-card',
  standalone: true,
  imports: [CommonModule, CardModule, ExerciseCardComponent],
  templateUrl: './daily-card.component.html',
  styleUrl: './daily-card.component.css',
})
export class DailyCardComponent {
  @Input({ required: true }) day!: WorkoutPerDay;
  @Input({ required: true }) header!: string;
}
