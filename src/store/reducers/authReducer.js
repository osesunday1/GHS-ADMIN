import { LOGIN_SUCCESS, LOGOUT, AUTH_ERROR } from '../types/types';

// Load from localStorage if available
const userFromStorage = localStorage.getItem('authUser')
  ? JSON.parse(localStorage.getItem('authUser'))
  : null;

const tokenFromStorage = localStorage.getItem('authToken')
  ? localStorage.getItem('authToken')
  : null;

const initialState = {
  isAuthenticated: !!userFromStorage,
  user: userFromStorage,
  token: tokenFromStorage,
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch(action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
        error: null,
      };
    case LOGOUT:
      return {
        isAuthenticated: false,
        user: null,
        token: null,
        error: null,
      };
    case AUTH_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export default authReducer;