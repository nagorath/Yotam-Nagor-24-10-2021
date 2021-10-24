import {createAction, createFeatureSelector, createReducer, createSelector, on} from '@ngrx/store';
import * as NavbarActions from './nav-bar.actions';

export interface State {
  products: NavBarState;
}

export interface NavBarState {
  selectedMenu: string;
}

const InitialState: NavBarState = {
  selectedMenu: 'favorites'
};

const getNavBarFeatureState = createFeatureSelector<NavBarState>('navbar');

export const getSelectedMenu = createSelector(
  getNavBarFeatureState,
  state => state.selectedMenu
);

export const navbarReducer = createReducer<NavBarState>(
  InitialState,
  on(NavbarActions.setSelectedMenu, (state, action): NavBarState => {
    return {
      ...state,
      selectedMenu: action.selectedMenu
    };
  })
);

