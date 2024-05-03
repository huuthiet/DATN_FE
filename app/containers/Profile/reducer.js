/*
 *
 * Profile reducer
 *
 */
import produce from 'immer';
import {
  DELETE_MOTEL_SUCCESS,
  DELETE_MOTEL_FAIL,
  GET_MOTEL_LIST_SUCCESS,
  GET_MOTEL_LIST_FAIL,
  CHANGE_STORE_DATA,
  GET_JOBS_SUCCESS,
  GET_JOBS_FAIL,
  GET_PROFILE_SUCCESS,
  GET_PROFILE_FAIL,
  CLEAR_PROFILE_SUCCESS,
  CLEAR_PROFILE_FAIL,
} from './constants';

export const initialState = {
  motelList: [],
  error: {},
  jobs: [],
  profile: {},
  showSuccessPopup: false,
  showErrorPopup: false,
  showWarningPopup: false,
  showAlert: false,
  alert: {
    title: '',
    content: '',
    callBack: '',
  },
};

/* eslint-disable default-case, no-param-reassign */
const profileReducer = (state = initialState, action) =>
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
      case GET_JOBS_SUCCESS:
        draft.jobs = action.response.data;
        break;
      case GET_JOBS_FAIL:
        break;
      case GET_PROFILE_SUCCESS:
        draft.profile = action.response;
        break;
      case GET_PROFILE_FAIL:
        break;
      case CLEAR_PROFILE_SUCCESS:
        console.log({ CLEAR_PROFILE_SUCCESS: 'CLEAR_PROFILE_SUCCESS' });
        draft.profile = {};
        break;
      case CLEAR_PROFILE_FAIL:
        break;
      case CHANGE_STORE_DATA:
        draft[action.key] = action.value;
        break;
    }
  });

export default profileReducer;
