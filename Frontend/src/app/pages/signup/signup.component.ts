import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from '../../components/loading/loading.component';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink, LoadingComponent],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css', '../styles/forms.css'],
})
export class SignupComponent {
  loginForm: FormGroup;
  touchedSubmit: boolean = false;
  error: boolean = false;
  errorMsg = 'Error. ';
  showLoading: boolean = false;

  private readonly router = inject(Router);
  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    this.touchedSubmit = true;
    if (this.loginForm.valid) {
      this.showLoading = true;
      this.authService.signup(this.loginForm.value).subscribe({
        next: () => {
          const credentials = {
            username: this.loginForm.value.username,
            password: this.loginForm.value.password,
          };
          this.authService.login(credentials).subscribe((token) => {
            this.authService.saveToken(token);
            this.router.navigateByUrl('/home');
          });
          this.showLoading = false;
        },
        error: (error) => {
          console.log(error);
          this.error = true;
          this.errorMsg = error.error?.error || 'Unexpected error';
          this.showLoading = false;
        },
      });
    }
  }
}
