/*
 *
 * Profile reducer
 *
 */
import { Breadcrumbs } from '@material-ui/core';
import produce from 'immer';
import {
  GET_MOTEL_LIST_SUCCESS,
  GET_MOTEL_LIST_FAIL,
  GET_BUILDING_REVENUE_SUCCESS,
  GET_BUILDING_REVENUE_FAIL,
  CHANGE_STORE_DATA,
  DELETE_MOTEL_SUCCESS,
  DELETE_MOTEL_FAIL,
} from './constants';

export const initialState = {
  motelList: [],
  buildingRevenue: [],
  error: {},
  showSuccessPopup: false,
  showErrorPopup: false,
  showWarningPopup: false,
};

/* eslint-disable default-case, no-param-reassign */
const managerBuildingsHostReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_MOTEL_LIST_SUCCESS:
        draft.motelList = action.response;
        break;
      case GET_MOTEL_LIST_FAIL:
        draft.error = action.error;
        draft.showErrorPopup = true;
        break;
      case DELETE_MOTEL_SUCCESS:
        draft.motelList = action.response;
        draft.showSuccessPopup = true;
        break;
      case DELETE_MOTEL_FAIL:
        draft.error = action.error;
        draft.showErrorPopup = true;
        break;
      case CHANGE_STORE_DATA:
        draft[action.key] = action.value;
        break;
      case GET_BUILDING_REVENUE_SUCCESS:
        draft.buildingRevenue = action.response;
        break;
      case GET_BUILDING_REVENUE_FAIL:
        draft.error = action.error;
        draft.showErrorPopup = true;
        break;
    }
  });

export default managerBuildingsHostReducer;
