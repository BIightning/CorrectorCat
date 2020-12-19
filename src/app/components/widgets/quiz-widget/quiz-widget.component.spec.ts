import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { QuizWidgetComponent } from './quiz-widget.component';

describe('QuizWidgetComponent', () => {
  let component: QuizWidgetComponent;
  let fixture: ComponentFixture<QuizWidgetComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ QuizWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
