import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMainComponent } from './create-main.component';

describe('CreateMainComponent', () => {
  let component: CreateMainComponent;
  let fixture: ComponentFixture<CreateMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateMainComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
