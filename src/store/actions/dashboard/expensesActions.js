import axios from 'axios';
import {
  GET_TOTAL_EXPENSES_REQUEST,
  GET_TOTAL_EXPENSES_SUCCESS,
  GET_TOTAL_EXPENSES_FAILURE
} from '../../types/types';

const BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/v1/admin/total-expenses`;

export const getTotalExpenses = (start, end) => async (dispatch) => {


  dispatch({ type: GET_TOTAL_EXPENSES_REQUEST });
  try {
    const response = await axios.get(`${BASE_URL}?start=${start}&end=${end}`);
    
    dispatch({
      type: GET_TOTAL_EXPENSES_SUCCESS,
      payload: response.data
    });
  } catch (error) {
    dispatch({
      type: GET_TOTAL_EXPENSES_FAILURE,
      payload: error.response?.data?.message || error.message
    });
  }
};