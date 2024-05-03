/*
 *
 * Profile reducer
 *
 */
import produce from 'immer';
import {
  GET_MOTEL_LIST_SUCCESS,
  GET_MOTEL_LIST_FAIL,
  GET_HOST_REVENUE_SUCCESS,
  GET_HOST_REVENUE_FAIL,
  CHANGE_STORE_DATA,
} from './constants';

export const initialState = {
  hosts: [],
  error: {},
};

/* eslint-disable default-case, no-param-reassign */
const managerBuildingsHostReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_MOTEL_LIST_SUCCESS:
        draft.hosts = action.response.data;
        break;
      case GET_MOTEL_LIST_FAIL:
        draft.error = action.error;
        draft.showErrorPopup = true;
        break;
      case GET_HOST_REVENUE_SUCCESS:
        draft.buildingRevenue = action.payload;
        break;
      case GET_HOST_REVENUE_FAIL:
        draft.error = action.payload;
        draft.showErrorPopup = true;
        break;
      case CHANGE_STORE_DATA:
        draft[action.key] = action.value;
        break;
    }
  });

export default managerBuildingsHostReducer;
