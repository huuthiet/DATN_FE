/*
 *
 * MotelDetail reducer
 *
 */
import produce from 'immer';
import {
  CHANGE_STORE_DATA,
  GET_DATA_ENERGY_PER_HOUR_SUCCESS,
  GET_DATA_ENERGY_PER_HOUR_FAIL,
  GET_DATA_ENERGY_PER_DAY_SUCCESS,
  GET_DATA_ENERGY_PER_DAY_FAIL,
} from './constants';

export const initialState = {
  dataEnergy: {},
  dataEnergyPerDay: {},
};

/* eslint-disable default-case, no-param-reassign */
const FollowEnergyAdminReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_DATA_ENERGY_PER_HOUR_SUCCESS:
        draft.dataEnergy = action.response;
        break;
      case GET_DATA_ENERGY_PER_HOUR_FAIL:
        draft.dataEnergy = action.error;
        break;
      case GET_DATA_ENERGY_PER_DAY_SUCCESS:
        draft.dataEnergyPerDay = action.response;
        break;
      case GET_DATA_ENERGY_PER_DAY_FAIL:
        draft.dataEnergyPerDay = action.error;
        break;
      case CHANGE_STORE_DATA:
        draft[action.key] = action.value;
        break;
    }
  });

export default FollowEnergyAdminReducer;
