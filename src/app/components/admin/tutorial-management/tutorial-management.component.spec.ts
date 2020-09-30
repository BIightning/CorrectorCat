import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorialManagementComponent } from './tutorial-management.component';

describe('TutorialManagementComponent', () => {
  let component: TutorialManagementComponent;
  let fixture: ComponentFixture<TutorialManagementComponent>;

  beforeEach(async(() => {
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
