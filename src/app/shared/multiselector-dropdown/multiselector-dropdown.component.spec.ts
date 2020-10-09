import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiselectorDropdownComponent } from './multiselector-dropdown.component';

describe('MultiselectorDropdownComponent', () => {
  let component: MultiselectorDropdownComponent;
  let fixture: ComponentFixture<MultiselectorDropdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultiselectorDropdownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiselectorDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
