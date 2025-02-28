import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { MenuModule } from 'primeng/menu';
import { SplitButtonModule } from 'primeng/splitbutton';
import { ToolbarModule } from 'primeng/toolbar';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MenubarModule, MenuModule, SplitButtonModule, ToolbarModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  items: MenuItem[] = [
    { label: 'Home', routerLink: '/home' },
    { label: 'Create', routerLink: '/create' },
    { label: 'My Workouts', routerLink: '/my-workouts' },
    { label: 'Daily', routerLink: '/daily' },
    { label: 'Statistics', routerLink: '/statistics', disabled: true },
    {
      label: 'You',
      items: [
        { label: 'Profile', icon: 'pi pi-user', disabled: true },
        { label: 'Settings', icon: 'pi pi-cog', disabled: true },
        {
          label: 'Dark mode',
          icon: 'pi pi-moon',
          command: () => this.toggleDarkMode(),
        },
        { separator: true },
        { label: 'Sign out', icon: 'pi pi-sign-out' },
      ],
    },
  ];

  toggleDarkMode() {
    const element: HTMLElement = document.documentElement;
    if (this.items[5].items != undefined) {
      if (element.classList.toggle('my-app-dark')) {
        this.items[5].items[2].icon = 'pi pi-moon';
        this.items[5].items[2].label = 'Dark mode';
      } else {
        this.items[5].items[2].icon = 'pi pi-sun';
        this.items[5].items[2].label = 'Light mode';
      }
    }
  }

  username: string | null = '';
  isLoggedIn: boolean = false;

  private readonly router = inject(Router);
  constructor(private authService: AuthService) {
    this.getUsername();
    if (this.username != null) {
      this.isLoggedIn = true;
    }
  }

  getUsername() {
    this.username = this.authService.getUsernameFromToken();
  }

  signOut() {
    this.authService.signout();
    this.isLoggedIn = false;
    this.router.navigateByUrl('/home');
  }
}
