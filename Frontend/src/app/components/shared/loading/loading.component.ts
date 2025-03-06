import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ToastService } from '../../../services/toast.service';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [ToastModule, ButtonModule],
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.css',
})
export class LoadingComponent {}
