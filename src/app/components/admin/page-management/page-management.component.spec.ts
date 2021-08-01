import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PageManagementComponent } from './page-management.component';

describe('PageManagementComponent', () => {
  let component: PageManagementComponent;
  let fixture: ComponentFixture<PageManagementComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PageManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
