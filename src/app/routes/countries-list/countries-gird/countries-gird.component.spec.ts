import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CountriesGirdComponent } from './countries-gird.component';

describe('CountriesGirdComponent', () => {
  let component: CountriesGirdComponent;
  let fixture: ComponentFixture<CountriesGirdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CountriesGirdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CountriesGirdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
