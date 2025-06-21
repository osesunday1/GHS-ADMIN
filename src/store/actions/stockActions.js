import axios from 'axios';
import {
  STOCK_REMOVE_REQUEST,
  STOCK_REMOVE_SUCCESS,
  STOCK_REMOVE_FAIL,
  GET_STOCK_LOGS_REQUEST,
  GET_STOCK_LOGS_SUCCESS,
  GET_STOCK_LOGS_FAIL,
} from '../types/types';


const BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/v1/stock`;

const getTokenConfig = () => {
  const token = localStorage.getItem('authToken');
  return {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  };
};


export const removeMultipleStock = (data) => async (dispatch) => {
  try {
    dispatch({ type: STOCK_REMOVE_REQUEST });

    // Ensure payload matches the expected structure
   
    const payload = {
      customerName: data.customerName,
      products: data.products, // This should be an array of product objects
    };

    const res = await axios.post(`${BASE_URL}/remove-multiple`, payload, getTokenConfig());

    dispatch({ type: STOCK_REMOVE_SUCCESS, payload: res.data });
  } catch (error) {
   
    dispatch({
      type: STOCK_REMOVE_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};

export const getStockLogs = () => async (dispatch) => {
  try {
    dispatch({ type: GET_STOCK_LOGS_REQUEST });
    const res = await axios.get(`${BASE_URL}/history`, getTokenConfig());
    dispatch({ type: GET_STOCK_LOGS_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({ type: GET_STOCK_LOGS_FAIL, payload: error.response?.data?.message || error.message });
  }
};

export const updateStockLog = (logId, updatedData) => async (dispatch) => {
  try {
    const token = localStorage.getItem('authToken');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.put(`${BASE_URL}/log/${logId}`, updatedData, config);
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

export const deleteStockLog = (logId) => async (dispatch) => {
  try {
    const token = localStorage.getItem('authToken');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    await axios.delete(`${BASE_URL}/log/${logId}`, config);
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
};