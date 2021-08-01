import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TutorialWidgetsComponent } from './tutorial-widgets.component';

describe('TutorialWidgetsComponent', () => {
  let component: TutorialWidgetsComponent;
  let fixture: ComponentFixture<TutorialWidgetsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TutorialWidgetsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorialWidgetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
