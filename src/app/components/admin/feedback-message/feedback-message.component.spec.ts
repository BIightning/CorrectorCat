import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FeedbackMessageComponent } from './feedback-message.component';

describe('FeedbackMessageComponent', () => {
  let component: FeedbackMessageComponent;
  let fixture: ComponentFixture<FeedbackMessageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FeedbackMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedbackMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
