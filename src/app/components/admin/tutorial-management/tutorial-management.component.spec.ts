import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TutorialManagementComponent } from './tutorial-management.component';

describe('TutorialManagementComponent', () => {
  let component: TutorialManagementComponent;
  let fixture: ComponentFixture<TutorialManagementComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TutorialManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorialManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
