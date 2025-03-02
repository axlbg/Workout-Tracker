import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from '../../components/shared/loading/loading.component';
import { Router, RouterLink } from '@angular/router';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink, LoadingComponent],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css', '../../styles/forms.css'],
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
export class SignupComponent implements OnInit {
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
    setTimeout(() => (this.isBounce = true), 10);
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
