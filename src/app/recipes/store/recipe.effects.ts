import {Actions, Effect} from '@ngrx/effects';
import * as RecipeActions from '../store/recipe.actions';
import * as fromRecipe from '../store/recipe.reducers';
import {Recipe} from '../recipe.model';
import {HttpClient, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {dispatch} from 'rxjs/internal-compatibility';

@Injectable()
export class RecipeEffects {
  @Effect()
  recipeFetch = this.actions$
    .ofType(RecipeActions.FETCH_RECIPES)
    .switchMap((action: RecipeActions.FetchRecipes) => {
      return this.httpClient.get<Recipe[]>('https://ng-recipe-book-9f137.firebaseio.com/recipes.json', {
        observe: 'body',
        responseType: 'json'
      });
    })
    .map(
      (recipes) => {
        console.log(recipes);
        for (const recipe of recipes) {
          if (!recipe['ingredients']) {
            recipe['ingredients'] = [];
          }
        }
        return {
         type: RecipeActions.SET_RECIPES,
         payload: recipes
        };
      }
    )
;

  @Effect({dispatch: false})
  recipeStore = this.actions$
    .ofType(RecipeActions.STORE_RECIPES)
    .withLatestFrom(this.store.select('recipes'))
    .switchMap(([action, state]) => {
      const req = new HttpRequest('PUT', 'https://ng-recipe-book-9f137.firebaseio.com/recipes.json',
        state.recipes, {reportProgress: true});
      return this.httpClient.request(req);
    });

  constructor(private store: Store<fromRecipe.FeaturedState>, private actions$: Actions, private httpClient: HttpClient) {
  }
}
