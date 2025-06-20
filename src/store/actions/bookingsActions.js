import axios from 'axios';
import {
  GET_BOOKINGS_REQUEST,
  GET_BOOKINGS_SUCCESS,
  GET_BOOKINGS_FAIL,
} from '../types/types';

// Base URL
const BASE_URL = 'http://localhost:5000/api/v1/bookings';

// Get token helper
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

// GET all bookings
export const getBookings = () => async (dispatch) => {
  try {
    dispatch({ type: GET_BOOKINGS_REQUEST });

    const res = await axios.get(BASE_URL, getTokenConfig());

    dispatch({
      type: GET_BOOKINGS_SUCCESS,
      payload: res.data.data,
    });
  } catch (error) {
    dispatch({
      type: GET_BOOKINGS_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};

// GET single booking by ID
export const getBookingById = async (id) => {
  try {
    const res = await axios.get(`${BASE_URL}/${id}`, getTokenConfig());
    return res.data.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

// ADD new booking
export const addBooking = async (bookingData) => {
  try {
    const res = await axios.post(BASE_URL, bookingData, getTokenConfig(true)); // true = multipart
    console.log('add data: ', res.data)
    return res.data;
  } catch (error) {
    console.log('error data: ', error)
    throw new Error(error.response?.data?.message || error.message);
  }
};

// UPDATE booking
export const updateBooking = async (id, updatedData) => {
  try {
    const res = await axios.put(`${BASE_URL}/${id}`, updatedData, getTokenConfig());
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

// DELETE booking
export const deleteBooking = async (id) => {
  try {
    const res = await axios.delete(`${BASE_URL}/${id}`, getTokenConfig());
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
};