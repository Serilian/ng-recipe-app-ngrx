import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import * as fromShoppingList from '../shopping-list/ngrx/shopping-list-reducers';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  shoppingListState: Observable<{ingredients: Ingredient[]}>;
  private subscription: Subscription;

  constructor(private store: Store<fromShoppingList.AppState>, private slService: ShoppingListService) { }

  ngOnInit() {
    this.shoppingListState = this.store.select('shoppingList');
    // this.subscription = this.slService.ingredientsChanged
    //   .subscribe(
    //     (shoppingListState: Ingredient[]) => {
    //       this.shoppingListState = shoppingListState;
    //     }
    //   );
  }

  onEditItem(index: number) {
    this.slService.startedEditing.next(index);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
