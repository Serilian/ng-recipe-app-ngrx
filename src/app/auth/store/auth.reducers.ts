import * as authActions from '../store/auth.actions';


export interface State {
  token: string;
  authenticated: boolean;
}

const initialState = {
  token: null,
  authenticated: false
};

export function authReducer (state = initialState, action: authActions.authActions) {
  switch (action.type) {
    case authActions.SIGNUP:
      return {
        ...state,
        authenticated: true
      };
    case authActions.SIGNIN:
      return {
        ...state,
        authenticated: true
      };
    case authActions.LOGOUT:
      return {
        ...state,
        authenticated: false,
        token: null
      };
    case authActions.SET_TOKEN:
      return {
        ...state,
        token: action.payload
      };
    default:
      return state;
  }
}
