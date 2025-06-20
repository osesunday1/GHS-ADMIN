import {
  STOCK_REMOVE_REQUEST,
  STOCK_REMOVE_SUCCESS,
  STOCK_REMOVE_FAIL,
  GET_STOCK_LOGS_REQUEST,
  GET_STOCK_LOGS_SUCCESS,
  GET_STOCK_LOGS_FAIL,
} from '../types/types';

const initialState = {
  logs: [],
  loading: false,
  error: null,
};

const stockReducer = (state = initialState, action) => {
  switch (action.type) {
    case STOCK_REMOVE_REQUEST:
    case GET_STOCK_LOGS_REQUEST:
      return { ...state, loading: true };
    case STOCK_REMOVE_SUCCESS:
      return { ...state, loading: false };
    case GET_STOCK_LOGS_SUCCESS:
      return { ...state, loading: false, logs: action.payload };
    case STOCK_REMOVE_FAIL:
    case GET_STOCK_LOGS_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default stockReducer;