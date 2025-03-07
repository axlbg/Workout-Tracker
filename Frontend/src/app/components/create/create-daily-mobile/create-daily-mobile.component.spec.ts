import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDailyMobileComponent } from './create-daily-mobile.component';

describe('CreateDailyMobileComponent', () => {
  let component: CreateDailyMobileComponent;
  let fixture: ComponentFixture<CreateDailyMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateDailyMobileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateDailyMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
