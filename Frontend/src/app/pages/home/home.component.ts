import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { PanelModule } from 'primeng/panel';
import { DividerModule } from 'primeng/divider';
import { CarouselModule } from 'primeng/carousel';
import { AnimateOnScrollModule } from 'primeng/animateonscroll';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-home',
  imports: [
    NavbarComponent,
    CardModule,
    ButtonModule,
    CommonModule,
    PanelModule,
    DividerModule,
    CarouselModule,
    AnimateOnScrollModule,
    FooterComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  workoutItems = [
    {
      image: '/images/home-workouts.jpg',
      alt: 'Workout',
      title: 'Create and customize your workouts 🛠️',
      description:
        'Design routines tailored to you. Add exercises, adjust reps, and take your training to the next level.',
    },
    {
      image: '/images/home-daily.jpg',
      alt: 'Daily',
      title: 'Daily Exercises 🧘‍♀️',
      description:
        'Quickly check your daily exercise routine and track your progress. Stay consistent and make every day count towards your goals.',
    },
    {
      image: '/images/home-statistics.png',
      alt: 'Progress',
      title: 'Track your progress 📈',
      description:
        'Visualize your achievements with clear statistics. Analyze your evolution and adjust your routine to meet your goals.',
    },
  ];

  steps = [
    {
      header: 'Step 1',
      image: '/images/step-1.png',
      text: 'Select name & icon',
    },
    {
      header: 'Step 2',
      image: '/images/step-2.png',
      text: 'Choose the days and the duration of your workout',
    },
    {
      header: 'Step 3',
      image: '/images/step-3.png',
      text: 'Create your routine day by day',
    },
    {
      header: 'Check it daily',
      image: '/images/step-4.png',
      text: 'Check your daily exercise routine and track your progress',
    },
  ];

  responsiveOptions = [{ breakpoint: '960px', numVisible: 1, numScroll: 1 }];
}
