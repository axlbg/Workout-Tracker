import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectWorkoutComponent } from './select-workout.component';

describe('SelectWorkoutComponent', () => {
  let component: SelectWorkoutComponent;
  let fixture: ComponentFixture<SelectWorkoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectWorkoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectWorkoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
