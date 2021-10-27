import { Component , OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { getSelectedMenu , AppGlobalState , getIsDarkMode } from '../../app-state/app-state.reducer';
import * as AppStateActions from '../../app-state/app-state.actions';
import { Event, NavigationStart , Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  selectedMenu$: Observable<string>;
  isDarkMode$: Observable<boolean>;
  constructor(
    private store: Store<AppGlobalState>,
    private location: Location,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.selectedMenu$ = this.store.select(getSelectedMenu);
    this.isDarkMode$ = this.store.select(getIsDarkMode);
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        const currentRoute = event.url.substring(1);
        this.store.dispatch(AppStateActions.setSelectedMenu({selectedMenu: currentRoute}));
      }
    });
  }
  onMenuSelect(title: string): void {
    this.store.dispatch(AppStateActions.setSelectedMenu({selectedMenu: title}));
  }

  toggleDarkMode(): void {
    this.store.dispatch(AppStateActions.toggleDarkMode());
    const autoCompleteEl = document.querySelector('.mat-form-field-flex');
    const autoCompleteUnderlineEl: HTMLElement = document.querySelector('.mat-form-field-ripple');
    const bodyEl = document.querySelector('body');
    if (autoCompleteEl && autoCompleteUnderlineEl) {
      if (!autoCompleteEl.classList.contains('dark-mode')) {
        autoCompleteEl.classList.add('dark-mode');
        bodyEl.classList.add('dark-mode');
        autoCompleteUnderlineEl.style.backgroundColor = '#E91E63';
      } else {
        autoCompleteEl.classList.remove('dark-mode');
        bodyEl.classList.remove('dark-mode');
        autoCompleteUnderlineEl.style.backgroundColor = '#3F51B5';
      }
    }
  }

}
