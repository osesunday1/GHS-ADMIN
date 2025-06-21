import axios from 'axios';
import {
  GET_GUESTS_REQUEST,
  GET_GUESTS_SUCCESS,
  GET_GUESTS_FAIL,
  UPDATE_GUEST_REQUEST,
  UPDATE_GUEST_SUCCESS,
  UPDATE_GUEST_FAIL,
} from '../types/types';


const BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/v1/guests`;

const getTokenConfig = (isMultipart = false) => {
  const token = localStorage.getItem('authToken');
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  if (!isMultipart) {
    headers['Content-Type'] = 'application/json';
  }
  return { headers };
};

// Fetch all guests
export const getGuests = () => async (dispatch) => {
 
  try {
    dispatch({ type: GET_GUESTS_REQUEST });
    const res = await axios.get(BASE_URL, getTokenConfig());
    
    dispatch({ type: GET_GUESTS_SUCCESS, payload: res.data.data });
  } catch (error) {
    
    dispatch({
      type: GET_GUESTS_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};

// Update a guest
export const updateGuest = (id, updatedData) => async (dispatch) => {
   console.log('guest actions')
  try {
    dispatch({ type: UPDATE_GUEST_REQUEST });
    const res = await axios.put(`${BASE_URL}/${id}`, updatedData, getTokenConfig(true));
    console.log('guest res data: ', res.data.data)
    dispatch({ type: UPDATE_GUEST_SUCCESS, payload: res.data.data });
  } catch (error) {
    console.log('error :', error)
    dispatch({
      type: UPDATE_GUEST_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};