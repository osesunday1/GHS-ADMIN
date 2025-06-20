import axios from 'axios';
import {
  GET_PRODUCTS_REQUEST,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_FAIL,
  ADD_PRODUCT_SUCCESS,
  DELETE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_SUCCESS
} from '../types/types';

const BASE_URL = 'http://localhost:5000/api/v1/product';

const getTokenConfig = () => {
  const token = localStorage.getItem('authToken');
  return {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    }
  };
};

export const getProducts = () => async (dispatch) => {
  try {
    dispatch({ type: GET_PRODUCTS_REQUEST });
    const res = await axios.get(BASE_URL, getTokenConfig());
    dispatch({ type: GET_PRODUCTS_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({ type: GET_PRODUCTS_FAIL, payload: error.message });
  }
};

export const addProduct = (data) => async (dispatch) => {
  try {
    const res = await axios.post(BASE_URL, data, getTokenConfig());
    dispatch({ type: ADD_PRODUCT_SUCCESS, payload: res.data });
  } catch (error) {
    console.error('Error adding product:', error.message);
  }
};
export const updateProduct = (id, data) => async (dispatch) => {
  const res = await axios.put(`${BASE_URL}/${id}`, data, getTokenConfig());
  dispatch({ type: UPDATE_PRODUCT_SUCCESS, payload: res.data });
};

export const deleteProduct = (id) => async (dispatch) => {
  await axios.delete(`${BASE_URL}/${id}`, getTokenConfig());
  dispatch({ type: DELETE_PRODUCT_SUCCESS, payload: id });
};