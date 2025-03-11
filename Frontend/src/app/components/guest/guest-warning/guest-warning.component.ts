import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DrawerModule } from 'primeng/drawer';

@Component({
  selector: 'app-guest-warning',
  imports: [DrawerModule, RouterLink],
  templateUrl: './guest-warning.component.html',
  styleUrl: './guest-warning.component.css',
})
export class GuestWarningComponent {
  visible: boolean = true;

  constructor() {
    console.log('GUEST');
  }
}
