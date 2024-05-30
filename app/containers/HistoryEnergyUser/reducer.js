import produce from 'immer';
import {
  GET_HISTORY_ENERGY_PER_MONTH_SUCCESS,
  GET_HISTORY_ENERGY_PER_MONTH_FAIL,
} from './constants';

export const initialState = {
  historyEnergy: {},
};

/* eslint-disable default-case, no-param-reassign */
const hostHistoryEnergyUserReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_HISTORY_ENERGY_PER_MONTH_SUCCESS:
        draft.historyEnergy = action.response;
        break;
      case GET_HISTORY_ENERGY_PER_MONTH_FAIL:
        draft.historyEnergy = action.error;
        break;
    }
  });

export default hostHistoryEnergyUserReducer;
