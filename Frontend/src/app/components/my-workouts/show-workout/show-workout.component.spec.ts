import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowWorkoutComponent } from './show-workout.component';

describe('ShowWorkoutComponent', () => {
  let component: ShowWorkoutComponent;
  let fixture: ComponentFixture<ShowWorkoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowWorkoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowWorkoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
