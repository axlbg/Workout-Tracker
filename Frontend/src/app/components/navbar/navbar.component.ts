import { Component, HostListener, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { MenuModule } from 'primeng/menu';
import { SplitButtonModule } from 'primeng/splitbutton';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    MenubarModule,
    MenuModule,
    SplitButtonModule,
    ToolbarModule,
    ButtonModule,
    TieredMenuModule,
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
    { label: 'Statistics', routerLink: '/statistics' },
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

  isDesktop: boolean = window.innerWidth >= 960;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.isDesktop = window.innerWidth >= 960;
  }

  public readonly router = inject(Router);
  constructor(
    private authService: AuthService,
    private themeService: ThemeService
  ) {
    this.getUsername();
    if (this.username != null) {
      this.isLoggedIn = true;
    }
  }

  toggleDarkMode() {
    const newTheme =
      this.themeService.getCurrentTheme() === 'dark' ? 'light' : 'dark';
    if (this.itemsLogged[2] != undefined) {
      if (newTheme === 'dark') {
        this.itemsLogged[2].icon = 'pi pi-sun';
        this.itemsLogged[2].label = 'Light mode';
      } else {
        this.itemsLogged[2].icon = 'pi pi-moon';
        this.itemsLogged[2].label = 'Dark mode';
      }
    }
    console.log(newTheme);
    this.themeService.setTheme(newTheme);
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
