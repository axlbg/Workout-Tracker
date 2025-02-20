import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
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
  }
}
