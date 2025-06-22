import axios from 'axios';
import {
  GET_EXPENSES_REQUEST,
  GET_EXPENSES_SUCCESS,
  GET_EXPENSES_FAIL,
  ADD_EXPENSE_SUCCESS,
  DELETE_EXPENSE_SUCCESS,
  UPDATE_EXPENSE_SUCCESS,
} from '../types/types';

const BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/v1/expenses`;

export const getExpenses = () => async (dispatch) => {
  try {
    dispatch({ type: GET_EXPENSES_REQUEST });
    const res = await axios.get(BASE_URL);
    dispatch({ type: GET_EXPENSES_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({ type: GET_EXPENSES_FAIL, payload: error.message });
  }
};

export const addExpense = (data) => async (dispatch) => {
  const res = await axios.post(BASE_URL, data);
  dispatch({ type: ADD_EXPENSE_SUCCESS, payload: res.data });
};

export const updateExpense = (id, data) => async (dispatch) => {
  const res = await axios.put(`${BASE_URL}/${id}`, data);
  dispatch({ type: UPDATE_EXPENSE_SUCCESS, payload: res.data });
};

export const deleteExpense = (id) => async (dispatch) => {
  await axios.delete(`${BASE_URL}/${id}`);
  dispatch({ type: DELETE_EXPENSE_SUCCESS, payload: id });
};