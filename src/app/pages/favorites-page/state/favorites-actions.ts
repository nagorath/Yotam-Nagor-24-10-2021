import {createAction, props} from '@ngrx/store';
import {FavoriteCity} from '../classes/favorites.classes';

export const setNewFavoriteCity = createAction(
  'SET_FAVORITE_CITY',
  props<{favoriteCity: FavoriteCity[]}>()
);

