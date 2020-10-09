import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BetweenRangeComponent } from './between-range.component';

describe('BetweenRangeComponent', () => {
  let component: BetweenRangeComponent;
  let fixture: ComponentFixture<BetweenRangeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BetweenRangeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BetweenRangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
