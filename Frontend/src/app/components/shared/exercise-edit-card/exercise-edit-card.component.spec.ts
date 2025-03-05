import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExerciseEditCardComponent } from './exercise-edit-card.component';

describe('ExerciseEditCardComponent', () => {
  let component: ExerciseEditCardComponent;
  let fixture: ComponentFixture<ExerciseEditCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExerciseEditCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExerciseEditCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
