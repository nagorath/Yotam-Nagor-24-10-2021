import {createFeatureSelector, createReducer, createSelector, on} from '@ngrx/store';
import * as AppStateActions from './app-state.actions';

export interface AppGlobalState {
  appGlobalState: AppState;
}

export interface AppState {
  selectedMenu: string;
  isDarkMode: boolean;
}

const InitialState: AppState = {
  selectedMenu: '',
  isDarkMode: false
};

const getGlobalFeaturesState = createFeatureSelector<AppState>('appGlobalState');

export const getSelectedMenu = createSelector(
  getGlobalFeaturesState,
  state => state.selectedMenu
);

export const getIsDarkMode = createSelector(
  getGlobalFeaturesState,
  state => state.isDarkMode
);

export const appStateReducer = createReducer<AppState>(
  InitialState,
  on(AppStateActions.setSelectedMenu, (state, action): AppState => {
    return {
      ...state,
      selectedMenu: action.selectedMenu
    };
  }),
  on(AppStateActions.toggleDarkMode, (state): AppState => {
    return {
      ...state,
      isDarkMode: !state.isDarkMode
    };
  }),
);

