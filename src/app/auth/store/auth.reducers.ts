import {Ingredient} from '../../shared/ingredient.model';
import * as authActions from '../store/auth.actions';


export interface State {
  token: string;
  authenticated: boolean;
}

const initialState = {
  token: null,
  authenticated: false
};

export function authReducer(state = initialState, action: authActions.authActions) {
  switch (action.type) {
    case
      return {

      };

    default:
      return state;
  }
}
