import {
  GET_PRODUCTS_REQUEST,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_FAIL,
  ADD_PRODUCT_SUCCESS,
  DELETE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_SUCCESS,
} from '../types/types';

const initialState = {
  products: [],
  loading: false,
  error: null,
};

const inventoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCTS_REQUEST:
      return { ...state, loading: true };
    case GET_PRODUCTS_SUCCESS:
      return { ...state, loading: false, products: action.payload };
    case GET_PRODUCTS_FAIL:
      return { ...state, loading: false, error: action.payload };
    case ADD_PRODUCT_SUCCESS:
      return { ...state, products: [action.payload, ...state.products] };
    case DELETE_PRODUCT_SUCCESS:
      return { ...state, products: state.products.filter(p => p._id !== action.payload) };
    case UPDATE_PRODUCT_SUCCESS:
      return {
        ...state,
        products: state.products.map(p =>
          p._id === action.payload._id ? action.payload : p
        ),
      };
    default:
      return state;
  }
};

export default inventoryReducer;