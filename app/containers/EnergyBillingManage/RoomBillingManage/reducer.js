import produce from 'immer';

import {
  GET_DATA_ENERGY_PER_MONTH_ERROR,
  GET_DATA_ENERGY_PER_MONTH_SUCCESS,
} from './constants';

export const initialState = {
  energyBilling: [],
  error: {},
};

const energyBillingReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_DATA_ENERGY_PER_MONTH_SUCCESS:
        draft.energyBilling = action.response;
        break;
      case GET_DATA_ENERGY_PER_MONTH_ERROR:
        draft.energyBilling = action.error;
        break;
    }
  });

export default energyBillingReducer;
