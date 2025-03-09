import { Component, Input, OnInit } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { Workout } from '../../../class/workout';
import { MuscleGroup } from '../../../class/exercise';

@Component({
  selector: 'app-show-statistics',
  imports: [ChartModule],
  templateUrl: './show-statistics.component.html',
  styleUrl: './show-statistics.component.css',
})
export class ShowStatisticsComponent implements OnInit {
  @Input({ required: true }) workout!: Workout;

  chartData: any;

  constructor() {}

  ngOnInit(): void {
    // sort by day
    this.workout.workoutPerDays.sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    // initialize variable
    const statsBySets: Record<MuscleGroup, number> = {
      [MuscleGroup.BACK]: 0,
      [MuscleGroup.CHEST]: 0,
      [MuscleGroup.SHOULDERS]: 0,
      [MuscleGroup.BICEPS]: 0,
      [MuscleGroup.TRICEPS]: 0,
      [MuscleGroup.LEGS]: 0,
      [MuscleGroup.CORE]: 0,
      [MuscleGroup.CARDIO]: 0,
    };

    // add sets by muscleGroup
    this.workout.workoutPerDays.forEach((wpd) => {
      wpd.exercises.forEach((exercise) => {
        if (exercise.muscleGroup in statsBySets) {
          statsBySets[exercise.muscleGroup] += exercise.sets;
        }
      });
    });

    // separate data and labels
    const labels: string[] = [];
    const data: number[] = [];
    Object.entries(statsBySets).forEach(([muscleGroup, sets]) => {
      if (sets > 0) {
        labels.push(muscleGroup);
        data.push(sets);
      }
    });

    this.chartData = {
      labels: labels,
      datasets: [
        {
          label: 'Sets',
          data: data,
        },
      ],
    };
  }
}
