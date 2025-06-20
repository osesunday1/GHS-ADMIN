import axios from 'axios';
import { LOGIN_SUCCESS, LOGOUT, AUTH_ERROR } from '../types/types';

export const loginUser = ({ email, password }) => async dispatch => {
  try {
    const res = await axios.post(
      'http://localhost:5000/api/v1/users/login',
      { email, password },
      {
        withCredentials: true,
        headers: { 'Content-Type': 'application/json' }
      }
    );

    const { token, data, status } = res.data;

    // Fallback in case `user` is not nested inside `data`
    const user = data?.user || res.data.user || null;

    if (status === 'success' && token && user) {

        // Save to localStorage
        localStorage.setItem('authUser', JSON.stringify(user));
        localStorage.setItem('authToken', token);
        
      dispatch({
        type: LOGIN_SUCCESS,
        payload: {
          token,
          user
        }
      });;
      return { type: LOGIN_SUCCESS };
    } else {
      throw new Error('Invalid response structure');
    }

  } catch (err) {
    const msg = err.response?.data?.message || err.message || 'Login failed';
    dispatch({ type: AUTH_ERROR, payload: msg });
    return { type: AUTH_ERROR };
  }
};

export const logout = () => dispatch => {
    localStorage.removeItem('authUser');
    localStorage.removeItem('authToken');
  dispatch({ type: LOGOUT });
};