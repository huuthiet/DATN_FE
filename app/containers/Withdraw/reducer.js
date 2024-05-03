/*
 *
 * Profile reducer
 *
 */
import { Breadcrumbs } from '@material-ui/core';
import produce from 'immer';
import {
  GET_PROFILE_SUCCESS,
  GET_PROFILE_FAIL,
  GET_USER_BANK_SUCCESS,
  GET_USER_BANK_FAIL,
} from './constants';

export const initialState = {
  profile: {},
  banks: [],
};

/* eslint-disable default-case, no-param-reassign */
const withdrawReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_PROFILE_SUCCESS:
        draft.profile = action.response;
        break;
      case GET_PROFILE_FAIL:
        break;
      case GET_USER_BANK_SUCCESS:
        draft.banks = action.response.data;
        break;
      case GET_USER_BANK_FAIL:
        draft.error = action.error;
        draft.showErrorPopup = true;
        break;
    }
  });

export default withdrawReducer;
