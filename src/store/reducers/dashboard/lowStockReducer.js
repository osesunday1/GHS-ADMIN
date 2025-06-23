import {
  GET_LOW_STOCK_REQUEST,
  GET_LOW_STOCK_SUCCESS,
  GET_LOW_STOCK_FAIL
} from '../../types/types';

const initialState = {
  loading: false,
  lowStockProducts: [],
  error: null,
};

const lowStockReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_LOW_STOCK_REQUEST:
      return { ...state, loading: true, error: null };
    case GET_LOW_STOCK_SUCCESS:
      return {
        ...state,
        loading: false,
        lowStockProducts: action.payload,
      };
    case GET_LOW_STOCK_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default lowStockReducer;