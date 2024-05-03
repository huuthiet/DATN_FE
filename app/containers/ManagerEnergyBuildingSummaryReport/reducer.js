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
  CHANGE_STORE_DATA,
} from './constants';

export const initialState = {
  motelList: [],
  error: {},
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
      case CHANGE_STORE_DATA:
        draft[action.key] = action.value;
        break;
    }
  });

export default managerBuildingsHostReducer;
