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
import { LoadingComponent } from '../../components/shared/loading/loading.component';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { CardModule } from 'primeng/card';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterLink,
    LoadingComponent,
    CardModule,
    InputGroupModule,
    InputGroupAddonModule,
    PasswordModule,
    InputTextModule,
    ButtonModule,
    MessageModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css', '../../styles/forms.css'],
  animations: [
    trigger('bounce', [
      state('normal', style({ transform: 'translateY(-700px)' })),
      state('bounce', style({ transform: 'translateY(0px)' })),
      transition('normal => bounce', [
        animate('0.4s ease-in-out', style({ transform: 'translateY(0)' })),
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

  value!: string;

  private readonly router = inject(Router);
  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.loginForm = this.fb.group({
      username: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(20),
          Validators.pattern(/^\S*$/), // Sin espacios
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(30),
        ],
      ],
    });
  }

  ngOnInit() {
    this.authService.getUsernameFromToken() != null
      ? this.router.navigateByUrl('/home')
      : (this.showLoading = false);

    setTimeout(() => (this.isBounce = true), 10);
  }

  getErrorMessage(): boolean {
    const usernameControl = this.loginForm.get('username');
    const passwordControl = this.loginForm.get('password');

    if (this.touchedSubmit) {
      if (
        usernameControl?.hasError('required') &&
        passwordControl?.hasError('required')
      ) {
        this.errorMsg = 'Username and password are required';
        this.error = true;
        return true;
      }

      if (
        (usernameControl && usernameControl.invalid) ||
        (passwordControl && passwordControl.invalid)
      ) {
        this.errorMsg = 'Invalid username or password';
        this.error = true;
        return true;
      }
    }

    return false;
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
          this.errorMsg = 'Invalid username or password';
          this.showLoading = false;
        },
      });
    }
  }
}
