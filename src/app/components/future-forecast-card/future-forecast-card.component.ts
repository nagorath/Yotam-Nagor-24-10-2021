import {Component, Input} from '@angular/core';
import {FutureForecast} from '../../pages/weather-info-page/classes/weather-info.classes';

@Component({
  selector: 'app-future-forecast-card',
  templateUrl: './future-forecast-card.component.html',
  styleUrls: ['./future-forecast-card.component.scss']
})
export class FutureForecastCardComponent {
  @Input() cardData: FutureForecast;
  constructor() { }

}
