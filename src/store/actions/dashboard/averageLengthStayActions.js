import axios from 'axios';
import {
  GET_AVG_LENGTH_STAY_REQUEST,
  GET_AVG_LENGTH_STAY_SUCCESS,
  GET_AVG_LENGTH_STAY_FAIL
} from '../../types/types';

const BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/v1/admin/averageLengthofStay`;

export const getAverageLengthStay = (start, end) => async (dispatch) => {
  try {
    dispatch({ type: GET_AVG_LENGTH_STAY_REQUEST });

    const token = localStorage.getItem('authToken');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: { start, end },
    };

    const res = await axios.get(BASE_URL, config);

    dispatch({
      type: GET_AVG_LENGTH_STAY_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: GET_AVG_LENGTH_STAY_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};