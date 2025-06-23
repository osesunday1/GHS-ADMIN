import axios from 'axios';
import {
  GET_TOTAL_BOOKINGS_REQUEST,
  GET_TOTAL_BOOKINGS_SUCCESS,
  GET_TOTAL_BOOKINGS_FAIL
} from '../../types/types';

const BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/v1/admin/total-bookings`;

export const getTotalBookings = (start, end) => async (dispatch) => {
  try {
    dispatch({ type: GET_TOTAL_BOOKINGS_REQUEST });

    const token = localStorage.getItem('authToken');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      },
      params: { start, end }
    };

    const res = await axios.get(BASE_URL, config);

    dispatch({
      type: GET_TOTAL_BOOKINGS_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: GET_TOTAL_BOOKINGS_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};