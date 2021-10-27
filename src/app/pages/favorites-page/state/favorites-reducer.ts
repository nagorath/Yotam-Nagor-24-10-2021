import {createFeatureSelector, createReducer, createSelector, on} from '@ngrx/store';
import * as FavoritesActions from './favorites-actions';
import {FavoriteCity} from '../classes/favorites.classes';

export interface FavState {
  favorites: FavoritesState;
}

export interface FavoritesState {
  favoriteCities: FavoriteCity[];
}

const InitialState: FavoritesState = {
  favoriteCities: [
    {
    name: 'Tel Aviv',
    id: '215854',
    currentTemp: 22
    }
  ]
};

const getFavoritesState = createFeatureSelector<FavoritesState>('favorites');

export const getFavoriteCities = createSelector(
  getFavoritesState,
  state => state.favoriteCities
);

export const FavoritesReducer = createReducer<FavoritesState>(
  InitialState,
  on(FavoritesActions.setNewFavoriteCity, (state, action): FavoritesState => {
    return {
      ...state,
      favoriteCities: [...action.favoriteCity]
    };
  })
);



