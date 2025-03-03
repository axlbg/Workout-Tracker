import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkoutShowTableComponent } from './workout-show-table.component';

describe('WorkoutShowTableComponent', () => {
  let component: WorkoutShowTableComponent;
  let fixture: ComponentFixture<WorkoutShowTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkoutShowTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkoutShowTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
