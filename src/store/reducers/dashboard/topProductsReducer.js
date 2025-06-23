import {
  GET_TOP_PRODUCTS_REQUEST,
  GET_TOP_PRODUCTS_SUCCESS,
  GET_TOP_PRODUCTS_FAIL
} from '../../types/types';

const initialState = {
  loading: false,
  topProducts: [],
  error: null,
};

const topProductsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TOP_PRODUCTS_REQUEST:
      return { ...state, loading: true, error: null };
    case GET_TOP_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        topProducts: action.payload,
      };
    case GET_TOP_PRODUCTS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default topProductsReducer;