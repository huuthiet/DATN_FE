/*
 *
 * Profile reducer
 *
 */
import produce from 'immer';
import {
  GET_LIST_DEVICE_ENERGY_SUCCESS,
  GET_LIST_DEVICE_ENERGY_FAIL,
  CHANGE_STORE_DATA
} from './constants';

export const initialState = {
  error: {},
  listDeviceEnergy: [],
};

/* eslint-disable default-case, no-param-reassign */
const managerEnergyRoomsReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_LIST_DEVICE_ENERGY_SUCCESS:
        draft.listDeviceEnergy = action.response;
        break;
      case GET_LIST_DEVICE_ENERGY_FAIL:
        break;
      case CHANGE_STORE_DATA:
        draft[action.key] = action.value;
        break;
    }
  });

export default managerEnergyRoomsReducer;
