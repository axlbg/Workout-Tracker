import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowDailyComponent } from './show-daily.component';

describe('ShowDailyComponent', () => {
  let component: ShowDailyComponent;
  let fixture: ComponentFixture<ShowDailyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowDailyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowDailyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
