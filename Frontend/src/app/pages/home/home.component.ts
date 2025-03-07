import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { PanelModule } from 'primeng/panel';
import { DividerModule } from 'primeng/divider';

@Component({
  selector: 'app-home',
  imports: [
    NavbarComponent,
    CardModule,
    ButtonModule,
    CommonModule,
    PanelModule,
    DividerModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  workoutItems = [
    {
      image:
        'https://media.revistagq.com/photos/65b12cd1df908a3c3a4d7373/16:9/w_2560%2Cc_limit/fitness%2520portada.jpg',
      alt: 'Workout',
      title: 'Create and customize your workouts 🛠️',
      description:
        'Design routines tailored to you. Add exercises, adjust reps, and take your training to the next level.',
    },
    {
      image:
        'https://media.revistagq.com/photos/65b12cd1df908a3c3a4d7373/16:9/w_2560%2Cc_limit/fitness%2520portada.jpg',
      alt: 'Daily',
      title: 'Daily Exercises 🧘‍♀️',
      description:
        'Quickly check your daily exercise routine and track your progress. Stay consistent and make every day count towards your goals.',
    },
    {
      image:
        'https://media.revistagq.com/photos/65b12cd1df908a3c3a4d7373/16:9/w_2560%2Cc_limit/fitness%2520portada.jpg',
      alt: 'Progress',
      title: 'Track your progress 📈',
      description:
        'Visualize your achievements with clear statistics. Analyze your evolution and adjust your routine to meet your goals.',
    },
    {
      image:
        'https://media.revistagq.com/photos/65b12cd1df908a3c3a4d7373/16:9/w_2560%2Cc_limit/fitness%2520portada.jpg',
      alt: 'Reminders',
      title: 'Get reminders and motivation 🔔',
      description:
        'Stay on track. Enable notifications to stay focused and never miss a workout.',
    },
  ];
}
