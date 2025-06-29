import axios from 'axios';
import {
  GET_REPEAT_GUESTS_REQUEST,
  GET_REPEAT_GUESTS_SUCCESS,
  GET_REPEAT_GUESTS_FAIL
} from '../../types/types';

const BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/v1/admin/repeatGuest`;

export const getRepeatGuests = (start, end) => async (dispatch) => {
  try {
    dispatch({ type: GET_REPEAT_GUESTS_REQUEST });

    const token = localStorage.getItem('authToken');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      },
      params: { start, end } 
    };

    const res = await axios.get(BASE_URL, config);

    dispatch({
      type: GET_REPEAT_GUESTS_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: GET_REPEAT_GUESTS_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};