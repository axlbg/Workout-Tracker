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

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink, LoadingComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css', '../styles/forms.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  touchedSubmit: boolean = false;
  error: boolean = false;
  errorMsg = 'Error. ';
  showLoading: boolean;

  private readonly router = inject(Router);
  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', Validators.required],
    });

    this.showLoading = true;
  }

  ngOnInit() {
    this.authService.getUsernameFromToken() != null
      ? this.router.navigateByUrl('/home')
      : (this.showLoading = false);
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
