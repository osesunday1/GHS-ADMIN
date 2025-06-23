import {
  GET_REVENUE_PER_APARTMENT_REQUEST,
  GET_REVENUE_PER_APARTMENT_SUCCESS,
  GET_REVENUE_PER_APARTMENT_FAIL
} from '../../types/types';

const initialState = {
  loading: false,
  apartmentRevenueData: [],
  error: null,
};

const revenuePerApartmentReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_REVENUE_PER_APARTMENT_REQUEST:
      return { ...state, loading: true, error: null };
    case GET_REVENUE_PER_APARTMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        apartmentRevenueData: action.payload,
      };
    case GET_REVENUE_PER_APARTMENT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default revenuePerApartmentReducer;