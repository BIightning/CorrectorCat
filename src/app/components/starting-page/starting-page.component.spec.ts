import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { StartingPageComponent } from './starting-page.component';

describe('StartingPageComponent', () => {
  let component: StartingPageComponent;
  let fixture: ComponentFixture<StartingPageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ StartingPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StartingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
