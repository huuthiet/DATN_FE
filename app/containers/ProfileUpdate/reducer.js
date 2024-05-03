/*
 *
 * Profile reducer
 *
 */
import produce from 'immer';
import {
  // eslint-disable-next-line import/named
  CHANGE_STORE_DATA,
  GET_PROFILE_FAIL,
  GET_PROFILE_SUCCESS,
  POST_PROFILE_UPDATE_FAIL,
} from './constants';

export const initialState = {
  profile: {},
  error: [],
  showSuccessPopup: false,
  showErrorPopup: false,
  showWarningPopup: false,
};

/* eslint-disable default-case, no-param-reassign */
const profileReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_PROFILE_SUCCESS:
        draft.profile = action.response;
        break;
      case GET_PROFILE_FAIL:
        draft.error = action.error.errors;
        break;
      case POST_PROFILE_UPDATE_FAIL:
        draft.error = action.error.errors;
        break;
      case CHANGE_STORE_DATA:
        draft[action.key] = action.value;
        break;
    }
  });

export default profileReducer;
