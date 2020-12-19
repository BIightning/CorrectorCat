import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { WorldCanvasComponent } from './world-canvas.component';

describe('WorldCanvasComponent', () => {
  let component: WorldCanvasComponent;
  let fixture: ComponentFixture<WorldCanvasComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ WorldCanvasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorldCanvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
