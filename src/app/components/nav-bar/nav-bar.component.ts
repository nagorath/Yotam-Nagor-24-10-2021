import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {getSelectedMenu, State} from './state/nav-bar.reducer';
import * as NavBarActions from './state/nav-bar.actions';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  selectedMenu$: Observable<string>;
  constructor(private store: Store<State>) { }

  ngOnInit(): void {
    this.selectedMenu$ = this.store.select(getSelectedMenu);
  }
  onMenuItemClick(title: string): void {
    this.store.dispatch(NavBarActions.setSelectedMenu({selectedMenu: title}));
  }

}
