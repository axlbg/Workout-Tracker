import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkoutShowDailyComponent } from './workout-show-daily.component';

describe('WorkoutShowDailyComponent', () => {
  let component: WorkoutShowDailyComponent;
  let fixture: ComponentFixture<WorkoutShowDailyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkoutShowDailyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkoutShowDailyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
