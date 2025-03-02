import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { MenuModule } from 'primeng/menu';
import { SplitButtonModule } from 'primeng/splitbutton';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    MenubarModule,
    MenuModule,
    SplitButtonModule,
    ToolbarModule,
    ButtonModule,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  itemsNav: MenuItem[] = [
    { label: 'Home', routerLink: '/home' },
    { label: 'Create', routerLink: '/create' },
    { label: 'My Workouts', routerLink: '/my-workouts' },
    { label: 'Daily', routerLink: '/daily' },
    { label: 'Statistics', routerLink: '/statistics', disabled: true },
  ];

  itemsLogged = [
    { label: 'Profile', icon: 'pi pi-user', disabled: true },
    { label: 'Settings', icon: 'pi pi-cog', disabled: true },
    {
      label: 'Dark mode',
      icon: 'pi pi-moon',
      command: () => this.toggleDarkMode(),
    },
    { separator: true },
    {
      label: 'Sign out',
      icon: 'pi pi-sign-out',
      command: () => this.signOut(),
    },
  ];

  username: string | null = '';
  isLoggedIn: boolean = false;

  public readonly router = inject(Router);
  constructor(private authService: AuthService) {
    this.getUsername();
    if (this.username != null) {
      this.isLoggedIn = true;
    }
  }

  toggleDarkMode() {
    const element: HTMLElement = document.documentElement;
    if (this.itemsLogged[2] != undefined) {
      if (element.classList.toggle('my-app-dark')) {
        this.itemsLogged[2].icon = 'pi pi-moon';
        this.itemsLogged[2].label = 'Dark mode';
      } else {
        this.itemsLogged[2].icon = 'pi pi-sun';
        this.itemsLogged[2].label = 'Light mode';
      }
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
