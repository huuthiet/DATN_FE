/*
 *
 * MotelDetail reducer
 *
 */
import produce from 'immer';
import {
  POST_USER_DETAIL_SUCCESS,
  POST_USER_DETAIL_FAIL,
  POST_USER_DETAIL_UPDATE_SUCCESS,
  POST_USER_DETAIL_UPDATE_FAIL,
  PUT_PROFILE_FAILD,
  CHANGE_STORE_DATA,
} from './constants';

export const initialState = {
  adminUsersDetail: {},
  adminUsersupdate: {},
  error: {},
  errors: [],
  showSuccessPopup: false,
  showErrorPopup: false,
  showWarningPopup: false,
};

/* eslint-disable default-case, no-param-reassign */
const AdminUsersDetailReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case POST_USER_DETAIL_SUCCESS:
        draft.adminUsersDetail = action.response;
        draft.error = [];
        break;
      case POST_USER_DETAIL_FAIL:
        draft.adminUsersDetail = action.error;
        draft.showErrorPopup = true;
        break;
      case POST_USER_DETAIL_UPDATE_SUCCESS:
        draft.adminUsersupdate = action.response;
        break;
      case PUT_PROFILE_FAILD:
        draft.error = action.error.errors;
        break;
      case POST_USER_DETAIL_UPDATE_FAIL:
        draft.adminUsersupdate = action.error;
        draft.showErrorPopup = true;
        break;
      case CHANGE_STORE_DATA:
        draft[action.key] = action.value;
        break;
    }
  });

export default AdminUsersDetailReducer;
