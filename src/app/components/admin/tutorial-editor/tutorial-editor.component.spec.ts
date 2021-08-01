import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TutorialEditorComponent } from './tutorial-editor.component';

describe('TutorialEditorComponent', () => {
  let component: TutorialEditorComponent;
  let fixture: ComponentFixture<TutorialEditorComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TutorialEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorialEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
