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
import { GuestService } from '../../services/guest.service';
import { CommonModule } from '@angular/common';

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
    CommonModule,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  itemsNav: MenuItem[] = [
    { label: 'Home', routerLink: '/home' },
    { label: 'Create', routerLink: '/create' },
    { label: 'My workouts', routerLink: '/my-workouts' },
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
    private themeService: ThemeService,
    private guestService: GuestService
  ) {
    this.username = authService.getUsernameFromToken();
    if (this.username != null) {
      this.initializeMenuDefault();
      this.isLoggedIn = true;
    } else if (!guestService.isGuestMode()) {
      this.initializeMenuLogout();
    }
    this.changeThemeLabel(themeService.getCurrentTheme());
  }

  private initializeMenuDefault() {
    this.itemsNav = [
      { label: 'Home', routerLink: '/home' },
      { label: 'Create', routerLink: '/create', disabled: false },
      { label: 'My workouts', routerLink: '/my-workouts', disabled: false },
      { label: 'Daily', routerLink: '/daily', disabled: false },
      { label: 'Statistics', routerLink: '/statistics', disabled: false },
    ];
  }

  private initializeMenuLogout() {
    this.itemsNav = [
      { label: 'Home', routerLink: '/home' },
      { label: 'My workouts', routerLink: '/my-workouts', disabled: true },
    ];
  }

  private changeThemeLabel(theme: string) {
    if (this.itemsLogged[2] != undefined) {
      if (theme === 'dark') {
        this.itemsLogged[2].icon = 'pi pi-sun';
        this.itemsLogged[2].label = 'Light mode';
      } else {
        this.itemsLogged[2].icon = 'pi pi-moon';
        this.itemsLogged[2].label = 'Dark mode';
      }
    }
  }

  toggleDarkMode() {
    const theme = this.themeService.getCurrentTheme();
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    this.changeThemeLabel(theme);
    this.themeService.setTheme(newTheme);
  }

  signOut() {
    this.authService.signout();
    this.isLoggedIn = false;
    this.initializeMenuLogout();
    this.router.navigateByUrl('/home');
  }

  joinAsGuest() {
    this.initializeMenuDefault();
    this.guestService.enableGuestMode();
  }

  leaveGuestMode() {
    this.initializeMenuLogout();
    this.guestService.disableGuestMode();
  }

  isGuestMode() {
    return this.guestService.isGuestMode();
  }
}
