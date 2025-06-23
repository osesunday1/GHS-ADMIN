import axios from 'axios';
import {
  GET_LOW_STOCK_REQUEST,
  GET_LOW_STOCK_SUCCESS,
  GET_LOW_STOCK_FAIL
} from '../../types/types';

const BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/v1/admin/low-stock-alerts`;

export const getLowStockAlerts = () => async (dispatch) => {
  try {
    dispatch({ type: GET_LOW_STOCK_REQUEST });

    const token = localStorage.getItem('authToken');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };

    const res = await axios.get(BASE_URL, config);

    dispatch({
      type: GET_LOW_STOCK_SUCCESS,
      payload: res.data.lowStockProducts,
    });
  } catch (error) {
    dispatch({
      type: GET_LOW_STOCK_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};
