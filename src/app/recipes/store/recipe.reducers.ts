import {Ingredient} from '../../shared/ingredient.model';
import {Recipe} from '../recipe.model';
import * as recipeActions from './recipe.actions';
import * as fromApp from '../../store/app.reducer';

export interface FeaturedState extends fromApp.AppState {
  recipes: State;
}


export interface State {
  recipes: Recipe[];
}

const initialState: State = {
  recipes: [
    new Recipe(
      'Tasty Schnitzel',
      'A super-tasty Schnitzel - just awesome!',
      'https://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG',
      [
        new Ingredient('Meat', 1),
        new Ingredient('French Fries', 20)
      ]),
    new Recipe('Big Fat Burger',
      'What else you need to say?',
      'https://upload.wikimedia.org/wikipedia/commons/b/be/Burger_King_Angus_Bacon_%26_Cheese_Steak_Burger.jpg',
      [
        new Ingredient('Buns', 2),
        new Ingredient('Meat', 1)
      ])
  ]
};


export function recipeReducer(state = initialState, action: recipeActions.RecipeActions) {
  switch (action.type) {
    case (recipeActions.SET_RECIPES):
      return {
        ...state,
        recipes: [...action.payload]
      };
    case (recipeActions.ADD_RECIPE):
      return {
        ...state,
        recipes: [...state.recipes, action.payload]
      };
    case (recipeActions.UPDATE_RECIPE):
      const recipe = state.recipes[action.payload.index];
      const updateRecipe = {
        ...recipe,
        ...action.payload.updatedRecipe
      };
      const recipes = [...state.recipes];
      recipes[action.payload.index] = updateRecipe;
      return {
        ...state,
        recipes: recipes
      };
    case (recipeActions.DELETE_RECIPE):
      const oldRecipes = [...state.recipes];
      oldRecipes.splice(action.payload, 1);
      return {
        ...state,
        recipes: oldRecipes
      };
    default:
      return state;
  }
}
