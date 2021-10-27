import {Component, OnInit} from '@angular/core';
import {FavState} from './pages/favorites-page/state/favorites-reducer';
import {Store} from '@ngrx/store';
import {setNewFavoriteCity} from './pages/favorites-page/state/favorites-actions';
import {FavoriteCity} from './pages/favorites-page/classes/favorites.classes';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'herolo-home-task';

  constructor(private favStore: Store<FavState>) {
  }
  ngOnInit() {
    this.getFavoriteCitiesFromLocalStorage();
  }

  getFavoriteCitiesFromLocalStorage(): void {
    const favoriteCitiesArrayJSON = localStorage.getItem('favoriteCitiesArray');
    const parsedFavoriteCitiesArray: FavoriteCity[] = JSON.parse(favoriteCitiesArrayJSON);
    this.favStore.dispatch(setNewFavoriteCity({favoriteCity: parsedFavoriteCitiesArray}));
  }
}
