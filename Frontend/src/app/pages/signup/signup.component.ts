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
import { CardModule } from 'primeng/card';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';

@Component({
  selector: 'app-signup',
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
    setTimeout(() => (this.isBounce = true), 10);
  }

  getErrorMessage(field: string): string | null {
    const control = this.loginForm.get(field);
    if (!control || !this.touchedSubmit) return null;

    const fieldName = field.charAt(0).toUpperCase() + field.slice(1);

    if (control.hasError('required')) {
      return `${fieldName} is required`;
    }

    if (control.hasError('minlength')) {
      return `${fieldName} must be at least ${control.errors?.['minlength'].requiredLength} characters`;
    }

    if (control.hasError('maxlength')) {
      return `${fieldName} must be at most ${control.errors?.['maxlength'].requiredLength} characters`;
    }

    if (control.hasError('pattern') && field === 'username') {
      return 'Username cannot contain spaces';
    }

    return null;
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
