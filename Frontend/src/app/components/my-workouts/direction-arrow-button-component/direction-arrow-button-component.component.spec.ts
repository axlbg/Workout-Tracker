import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectionArrowButtonComponentComponent } from './direction-arrow-button-component.component';

describe('DirectionArrowButtonComponentComponent', () => {
  let component: DirectionArrowButtonComponentComponent;
  let fixture: ComponentFixture<DirectionArrowButtonComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DirectionArrowButtonComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DirectionArrowButtonComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
