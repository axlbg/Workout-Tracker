import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  username: string = '';
  constructor(private authService: AuthService) {
    this.getUsername();
  }

  getUsername() {
    const username = this.authService.getUsernameFromToken();
    if (username != null) {
      this.username = username;
    }
  }
}
