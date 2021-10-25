import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteCityCardComponent } from './favorite-city-card.component';

describe('FavoriteCityCardComponent', () => {
  let component: FavoriteCityCardComponent;
  let fixture: ComponentFixture<FavoriteCityCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavoriteCityCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoriteCityCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
