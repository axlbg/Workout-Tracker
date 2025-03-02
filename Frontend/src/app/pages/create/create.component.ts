import { Component, inject } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { LoadingComponent } from '../../components/shared/loading/loading.component';
import { CreateMainComponent } from '../../components/create/create-main/create-main.component';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [NavbarComponent, CreateMainComponent],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css',
})
export class CreateComponent {
  showLoading: boolean = false;
}
