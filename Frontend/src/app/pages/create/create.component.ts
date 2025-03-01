import { Component, inject } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { LoadingComponent } from '../../components/loading/loading.component';
import { CreateMainComponent } from '../../create/create-main/create-main.component';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [NavbarComponent, LoadingComponent, CreateMainComponent],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css',
})
export class CreateComponent {
  showLoading: boolean = false;
}
