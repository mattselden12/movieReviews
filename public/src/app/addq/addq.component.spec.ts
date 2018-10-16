import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddqComponent } from './addq.component';

describe('AddqComponent', () => {
  let component: AddqComponent;
  let fixture: ComponentFixture<AddqComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddqComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
