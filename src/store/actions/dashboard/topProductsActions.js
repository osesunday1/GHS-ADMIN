import axios from 'axios';
import {
  GET_TOP_PRODUCTS_REQUEST,
  GET_TOP_PRODUCTS_SUCCESS,
  GET_TOP_PRODUCTS_FAIL
} from '../../types/types';

const BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/v1/admin/top5-products`;

export const getTopProducts = (start, end) => async (dispatch) => {
  try {
    dispatch({ type: GET_TOP_PRODUCTS_REQUEST });

    const token = localStorage.getItem('authToken');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      },
      params: { start, end }
    };

    const res = await axios.get(BASE_URL, config);

    dispatch({
      type: GET_TOP_PRODUCTS_SUCCESS,
      payload: res.data.topProducts,
    });
  } catch (error) {
    dispatch({
      type: GET_TOP_PRODUCTS_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};