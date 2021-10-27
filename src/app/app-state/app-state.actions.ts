import {createAction, props} from '@ngrx/store';

export const setSelectedMenu = createAction(
  'SELECT_MENU',
  props<{selectedMenu: string}>()
);

export const toggleDarkMode = createAction(
  'TOGGLE_DARK_MODE'
);
