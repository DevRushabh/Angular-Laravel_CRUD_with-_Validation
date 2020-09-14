import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NameDataComponent } from './name-data.component';

describe('NameDataComponent', () => {
  let component: NameDataComponent;
  let fixture: ComponentFixture<NameDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NameDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NameDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
