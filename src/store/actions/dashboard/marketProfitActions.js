import axios from 'axios';
import {
  GET_TOTAL_MARKET_REQUEST,
  GET_TOTAL_MARKET_SUCCESS,
  GET_TOTAL_MARKET_FAIL
} from '../../types/types';

const BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/v1/admin/market-profit`;

export const getMarketProfit = (start, end) => async (dispatch) => {
  try {

    dispatch({ type: GET_TOTAL_MARKET_REQUEST });

    const token = localStorage.getItem('authToken');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: { start, end },
    };

    const res = await axios.get(BASE_URL, config);


    dispatch({
      type: GET_TOTAL_MARKET_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    console.log('error:', error)
    dispatch({
      type: GET_TOTAL_MARKET_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};
