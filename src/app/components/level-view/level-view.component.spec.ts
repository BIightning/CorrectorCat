import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LevelViewComponent } from './level-view.component';

describe('LevelViewComponent', () => {
  let component: LevelViewComponent;
  let fixture: ComponentFixture<LevelViewComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LevelViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LevelViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
