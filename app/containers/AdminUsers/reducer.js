/*
 *
 * AdminUsers reducer
 *
 */
import produce from 'immer';
import {
  GET_ADMIN_USERS_SUCCESS,
  GET_ADMIN_USERS_FAIL,
  CHANGE_STORE_DATA,
  DELETE_ADMIN_USER_SUCCESS,
  DELETE_ADMIN_USER_FAIL,
  UPDATE_ADMIN_USER_SUCCESS,
  UPDATE_ADMIN_USER_FAIL,
  RESET_PW_ADMIN_USER_SUCCESS,
  RESET_PW_ADMIN_USER_FAIL,
} from './constants';

export const initialState = {
  users: [],
  error: {},
  showSuccessPopup: false,
  showErrorPopup: false,
  showWarningPopup: false,

  showSuccessPopupWall: false,
  showErrorPopupWall: false,
  showWarningPopupWall: false,

  PwNew: '',
  showSuccessResetPW: false,
  showErrorResetPW: false,
  showWarningResetPW: false,
};

/* eslint-disable default-case, no-param-reassign */
const adminUsersReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_ADMIN_USERS_SUCCESS:
        if (action.response) {
          // eslint-disable-next-line no-plusplus
          for (let index = 0; index < action.response.data.length; index++) {
            const element = action.response.data[index];
            element.key = index + 1;
            element.fullName = `${element.lastName} ${element.firstName}`;
            element.phoneNumber = `${element.phoneNumber.countryCode} ${
              element.phoneNumber.number
            }`;
          }
        }
        draft.users = action.response.data;
        break;
      case GET_ADMIN_USERS_FAIL:
        draft.error = action.error;
        draft.showErrorPopup = true;
        break;

      case DELETE_ADMIN_USER_SUCCESS:
        draft.showSuccessPopup = true;
        break;
      case DELETE_ADMIN_USER_FAIL:
        draft.error = action.error;
        draft.showErrorPopup = true;
        break;
      case RESET_PW_ADMIN_USER_SUCCESS:
        draft.PwNew = action.response;
        draft.showSuccessResetPW = true;
        break;
      case RESET_PW_ADMIN_USER_FAIL:
        draft.error = action.error;
        draft.showErrorResetPW = true;
        break;

      case UPDATE_ADMIN_USER_SUCCESS:
        draft.showSuccessPopupWall = true;
        break;
      case UPDATE_ADMIN_USER_FAIL:
        draft.error = action.error;
        draft.showErrorPopupWall = true;
        break;

      case CHANGE_STORE_DATA:
        draft[action.key] = action.value;
        break;
    }
  });

export default adminUsersReducer;
