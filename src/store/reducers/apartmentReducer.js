// reducers/apartmentReducer.js

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
  DELETE_APARTMENT_FAIL,
} from '../types/types';

const initialState = {
  apartments: [],
  apartment: null,
  loading: false,
  error: null,
};

const apartmentReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_APARTMENTS_REQUEST:
    case GET_APARTMENT_REQUEST:
    case CREATE_APARTMENT_REQUEST:
    case UPDATE_APARTMENT_REQUEST:
    case DELETE_APARTMENT_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case GET_APARTMENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        apartments: action.payload,
      };

    case GET_APARTMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        apartment: action.payload,
      };

    case CREATE_APARTMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        apartments: [...state.apartments, action.payload],
      };

    case UPDATE_APARTMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        apartments: state.apartments.map((apt) =>
          apt._id === action.payload._id ? action.payload : apt
        ),
      };

    case DELETE_APARTMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        apartments: state.apartments.filter((apt) => apt._id !== action.payload),
      };

    case GET_APARTMENTS_FAIL:
    case GET_APARTMENT_FAIL:
    case CREATE_APARTMENT_FAIL:
    case UPDATE_APARTMENT_FAIL:
    case DELETE_APARTMENT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
  
};

export default apartmentReducer;