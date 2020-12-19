import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BookstoreComponent } from './bookstore.component';

describe('BookstoreComponent', () => {
  let component: BookstoreComponent;
  let fixture: ComponentFixture<BookstoreComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BookstoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookstoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
