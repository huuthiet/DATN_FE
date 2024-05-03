/*
 *
 * JobDetail reducer
 *
 */
import produce from 'immer';
import {
  GET_JOB_DETAIL_SUCCESS,
  GET_JOB_DETAIL_FAIL,
  CHANGE_STORE_DATA,
  DELETE_JOB_DETAIL_SUCCESS,
  DELETE_JOB_DETAIL_FAIL,
} from './constants';

export const initialState = {
  job: [],
  error: {},
  showSuccessPopup: false,
  showErrorPopup: false,
  showWarningPopup: false,
};

/* eslint-disable default-case, no-param-reassign */
const jobDetailReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_JOB_DETAIL_SUCCESS:
        draft.job = action.response;
        break;
      case GET_JOB_DETAIL_FAIL:
        draft.error = action.error;
        draft.showErrorPopup = true;
        break;
      case DELETE_JOB_DETAIL_SUCCESS:
        draft.showSuccessPopup = true;
        break;
      case DELETE_JOB_DETAIL_FAIL:
        draft.error = action.error;
        draft.showErrorPopup = true;
        break;
      case CHANGE_STORE_DATA:
        draft[action.key] = action.value;
        break;
    }
  });

export default jobDetailReducer;
