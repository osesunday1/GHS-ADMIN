import axios from 'axios';
import {
  GET_APARTMENTS_REQUEST,
  GET_APARTMENTS_SUCCESS,
  GET_APARTMENTS_FAIL,
  GET_APARTMENT_REQUEST,
  GET_APARTMENT_SUCCESS,
  GET_APARTMENT_FAIL,
  CREATE_APARTMENT_REQUEST,
  CREATE_APARTMENT_SUCCESS,
  CREATE_APARTMENT_FAIL,
  UPDATE_APARTMENT_REQUEST,
  UPDATE_APARTMENT_SUCCESS,
  UPDATE_APARTMENT_FAIL,
  DELETE_APARTMENT_REQUEST,
  DELETE_APARTMENT_SUCCESS,
  DELETE_APARTMENT_FAIL
} from '../types/types';

const API_URL = 'http://localhost:5000/api/v1/apartments';
const getToken = () => localStorage.getItem('authToken');

// Get all apartments
export const getApartments = () => async (dispatch) => {
  try {
    dispatch({ type: GET_APARTMENTS_REQUEST });

    const res = await axios.get(API_URL, {
      headers: { Authorization: `Bearer ${getToken()}` },
      withCredentials: true,
    });


    dispatch({ type: GET_APARTMENTS_SUCCESS, payload: res.data.data });
  } catch (error) {
    dispatch({
      type: GET_APARTMENTS_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};

// Get a single apartment
export const getApartmentById = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_APARTMENT_REQUEST });

    const res = await axios.get(`${API_URL}/${id}`, {
      headers: { Authorization: `Bearer ${getToken()}` },
      withCredentials: true,
    });

    dispatch({ type: GET_APARTMENT_SUCCESS, payload: res.data.data });
  } catch (error) {
    dispatch({
      type: GET_APARTMENT_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};

// Create an apartment
export const createApartment = (apartmentData) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_APARTMENT_REQUEST });

    const res = await axios.post(API_URL, apartmentData, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });

    dispatch({ type: CREATE_APARTMENT_SUCCESS, payload: res.data.data });
  } catch (error) {
    dispatch({
      type: CREATE_APARTMENT_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};

// Update apartment
export const updateApartment = (id, apartmentData) => async (dispatch) => {
  console.log('successfully in actions')
  try {
    dispatch({ type: UPDATE_APARTMENT_REQUEST });

    const res = await axios.patch(`${API_URL}/${id}`, apartmentData, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });

    dispatch({ type: UPDATE_APARTMENT_SUCCESS, payload: res.data.data });
  } catch (error) {
    dispatch({
      type: UPDATE_APARTMENT_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};

// Delete apartment
export const deleteApartment = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_APARTMENT_REQUEST });

    await axios.delete(`${API_URL}/${id}`, {
      headers: { Authorization: `Bearer ${getToken()}` },
      withCredentials: true,
    });

    dispatch({ type: DELETE_APARTMENT_SUCCESS, payload: id });
  } catch (error) {
    dispatch({
      type: DELETE_APARTMENT_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};