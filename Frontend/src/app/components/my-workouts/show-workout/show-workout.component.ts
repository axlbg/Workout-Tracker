import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Workout } from '../../../class/workout';
import { WorkoutShowTableComponent } from '../workout-show-table/workout-show-table.component';
import { CardModule } from 'primeng/card';
import { WorkoutShowCardsComponent } from '../workout-show-cards/workout-show-cards.component';
import { SelectButtonModule } from 'primeng/selectbutton';
import { DirectionArrowButtonComponentComponent } from '../direction-arrow-button-component/direction-arrow-button-component.component';

@Component({
  selector: 'app-show-workout',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    WorkoutShowTableComponent,
    CardModule,
    WorkoutShowCardsComponent,
    SelectButtonModule,
    DirectionArrowButtonComponentComponent,
  ],
  templateUrl: './show-workout.component.html',
  styleUrls: ['./show-workout.component.css'],
})
export class ShowWorkoutComponent {
  @Input({ required: true, alias: 'workoutToShow' }) workout!: Workout;

  optionsView = [
    { icon: 'pi pi-table clickeable', value: 0 },
    { icon: 'pi pi-th-large clickeable', value: 1 },
    { icon: 'pi pi-equals clickeable', value: 2 },
  ];

  currentView: number = 0;

  changeView(obj: any): void {
    if (obj.value == null) this.currentView = 2;
  }
}
