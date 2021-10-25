import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {getSelectedMenu, State} from './state/nav-bar.reducer';
import * as NavBarActions from './state/nav-bar.actions';
import {Event, NavigationStart, Router} from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  menus: string[] = ['weather', 'favorites'];
  selectedMenu$: Observable<string>;
  constructor(private store: Store<State>, private location: Location, private router: Router) { }

  ngOnInit(): void {
    this.selectedMenu$ = this.store.select(getSelectedMenu);
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        const currentRoute = event.url.substring(1);
        this.store.dispatch(NavBarActions.setSelectedMenu({selectedMenu: currentRoute}));
      }
    });
  }
  onMenuSelect(title: string): void {
    this.store.dispatch(NavBarActions.setSelectedMenu({selectedMenu: title}));
  }

}
