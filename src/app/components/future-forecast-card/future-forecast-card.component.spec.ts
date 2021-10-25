import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FutureForecastCardComponent } from './future-forecast-card.component';

describe('FutureForecastCardComponent', () => {
  let component: FutureForecastCardComponent;
  let fixture: ComponentFixture<FutureForecastCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FutureForecastCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FutureForecastCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
