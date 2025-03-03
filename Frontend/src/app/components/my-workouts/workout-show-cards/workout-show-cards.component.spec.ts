import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkoutShowCardsComponent } from './workout-show-cards.component';

describe('WorkoutShowCardsComponent', () => {
  let component: WorkoutShowCardsComponent;
  let fixture: ComponentFixture<WorkoutShowCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkoutShowCardsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkoutShowCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
