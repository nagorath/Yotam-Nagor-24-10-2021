import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {WeatherInfoPageComponent} from './pages/weather-info-page/weather-info-page.component';
import {FavoritesPageComponent} from './pages/favorites-page/favorites-page.component';

const routes: Routes = [
  {
    path: '',
    component: WeatherInfoPageComponent
  },
  {
    path: 'weather',
    component: WeatherInfoPageComponent
  },
  {
    path: 'favorites',
    component: FavoritesPageComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
