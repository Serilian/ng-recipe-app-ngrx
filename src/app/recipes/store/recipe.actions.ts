import {Action} from '@ngrx/store';
import {Recipe} from '../recipe.model';


export const SET_RECIPES = 'SET_RECIPES';
export const ADD_RECIPE = 'ADD_RECIPE';
export const UPDATE_RECIPE = 'UPDATE_RECIPE';
export const DELETE_RECIPE = 'DELETE_RECIPE';


export class SetRecipes implements Action {
  readonly type: string = SET_RECIPES;
  public payload: Recipe[];
}

export class AddRecipe implements Action {
  readonly type: string = ADD_RECIPE;
  public payload: Recipe;
}

export class UpdateRecipe implements Action {
  readonly type: string = UPDATE_RECIPE;
  public payload: { index: number, updatedRecipe: Recipe };
}

export class DeleteRecipe implements Action {
  readonly type: string = DELETE_RECIPE;
  public payload: number;
}

export type RecipeActions =
  SetRecipes |
  AddRecipe |
  UpdateRecipe |
  DeleteRecipe;
