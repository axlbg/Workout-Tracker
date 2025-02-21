import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDailyComponent } from './create-daily.component';

describe('CreateDailyComponent', () => {
  let component: CreateDailyComponent;
  let fixture: ComponentFixture<CreateDailyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateDailyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateDailyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
