import axios from 'axios';
import {
  GET_REVENUE_PER_APARTMENT_REQUEST,
  GET_REVENUE_PER_APARTMENT_SUCCESS,
  GET_REVENUE_PER_APARTMENT_FAIL
} from '../../types/types';

const BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/v1/admin/revenuePerApartment`;

export const getRevenuePerApartment = (start, end) => async (dispatch) => {
  try {
    dispatch({ type: GET_REVENUE_PER_APARTMENT_REQUEST });

    const token = localStorage.getItem('authToken');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      },
      params: { start, end }
    };

    const res = await axios.get(BASE_URL, config);


    dispatch({
      type: GET_REVENUE_PER_APARTMENT_SUCCESS,
      payload: res.data.apartments,
    });
  } catch (error) {
    dispatch({
      type: GET_REVENUE_PER_APARTMENT_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};