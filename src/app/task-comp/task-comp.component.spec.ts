import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskCompComponent } from './task-comp.component';

describe('TaskCompComponent', () => {
  let component: TaskCompComponent;
  let fixture: ComponentFixture<TaskCompComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskCompComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskCompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
