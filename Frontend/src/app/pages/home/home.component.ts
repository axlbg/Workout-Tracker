import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { NavbarComponent } from '../../components/navbar/navbar.component';

@Component({
    selector: 'app-home',
    imports: [NavbarComponent],
    templateUrl: './home.component.html',
    styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private authService: AuthService) {}
}
