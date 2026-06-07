import axios from 'axios';
import {
  GET_BOOKING_STATUS_REQUEST,
  GET_BOOKING_STATUS_SUCCESS,
  GET_BOOKING_STATUS_FAIL,
} from '../../types/types';

const getToken = () => localStorage.getItem('authToken');

export const getBookingStatus = (start, end) => async (dispatch) => {
  try {
    dispatch({ type: GET_BOOKING_STATUS_REQUEST });

    const res = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/v1/admin/booking-status`,
      {
        params: { start, end },
        headers: { Authorization: `Bearer ${getToken()}` },
      }
    );

    dispatch({ type: GET_BOOKING_STATUS_SUCCESS, payload: res.data });
  } catch (err) {
    dispatch({
      type: GET_BOOKING_STATUS_FAIL,
      payload: err.response?.data?.message || err.message,
    });
  }
};
