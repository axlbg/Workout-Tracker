import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { LoadingComponent } from '../../components/loading/loading.component';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink, LoadingComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css', '../../styles/forms.css'],
  animations: [
    trigger('bounce', [
      state('normal', style({ transform: 'translateY(-700px)' })),
      state('bounce', style({ transform: 'translateY(0px)' })),
      transition('normal => bounce', [
        animate('0.3s ease-in-out', style({ transform: 'translateY(0)' })),
      ]),
    ]),
  ],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  touchedSubmit: boolean = false;
  error: boolean = false;
  errorMsg = 'Error. ';
  showLoading: boolean = false;
  isBounce: boolean = false;

  private readonly router = inject(Router);
  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.authService.getUsernameFromToken() != null
      ? this.router.navigateByUrl('/home')
      : (this.showLoading = false);

    setTimeout(() => (this.isBounce = true), 10);
  }

  onSubmit() {
    this.touchedSubmit = true;
    if (this.loginForm.valid) {
      this.showLoading = true;
      this.authService.login(this.loginForm.value).subscribe({
        next: (token: string) => {
          this.authService.saveToken(token);

          this.router.navigateByUrl('/home');
          this.showLoading = false;
        },
        error: (error) => {
          this.error = true;
          this.errorMsg = error.message || 'Unexpected error';
          this.showLoading = false;
        },
      });
    }
  }
}
