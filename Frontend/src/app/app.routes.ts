import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./pages/home/home.component').then((c) => c.HomeComponent),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.component').then((c) => c.LoginComponent),
  },
  {
    path: 'signup',
    loadComponent: () =>
      import('./pages/signup/signup.component').then((c) => c.SignupComponent),
  },
  {
    path: 'create',
    loadComponent: () =>
      import('./pages/create/create.component').then((c) => c.CreateComponent),
  },
  {
    path: 'my-workouts',
    loadComponent: () =>
      import('./pages/my-workouts/my-workouts.component').then(
        (c) => c.MyWorkoutsComponent
      ),
  },
  {
    path: 'daily',
    loadComponent: () =>
      import('./pages/daily/daily.component').then((c) => c.DailyComponent),
  },
  {
    path: 'statistics',
    loadComponent: () =>
      import('./pages/statistics/statistics.component').then(
        (c) => c.StatisticsComponent
      ),
  },
];
