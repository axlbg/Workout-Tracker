import { Component, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { IconService } from '../../../services/icon.service';
import { FloatLabelModule } from 'primeng/floatlabel';
import { MessageModule } from 'primeng/message';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-step-one',
  standalone: true,
  imports: [
    ButtonModule,
    FloatLabelModule,
    ReactiveFormsModule,
    InputTextModule,
    CommonModule,
    MessageModule,
  ],
  templateUrl: './create-step-one.component.html',
  styleUrls: ['./create-step-one.component.css', '../../../styles/icon.css'],
})
export class CreateStepOneComponent {
  form: FormGroup;
  touchedSubmit: boolean = false;

  public iconService = inject(IconService);
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      icon: [0, [Validators.required]],
    });
  }

  selectIcon(index: number) {
    this.form.patchValue({ icon: index });
  }

  isValid(): boolean {
    this.touchedSubmit = true;
    return this.form.valid;
  }

  getData() {
    this.touchedSubmit = true;
    return this.form.value;
  }
}
