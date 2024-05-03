/*
 *
 * Job reducer
 *
 */
import produce from 'immer';
import { GET_ROOM_SUCCESS, GET_ROOM_FAIL } from '../RoomDetail/constants';
import {
  GET_BANK_INFO_SUCCESS,
  GET_BANK_INFO_FAIL,
  POST_JOB_FAIL,
  POST_JOB_SUCCESS,
  CHANGE_STORE_DATA,
  PUT_JOB,
} from './constants';
export const initialState = {
  room: {},
  roomErrors: [],
  jobError: '',
  showError: false,
  jobErrorNuber: 0,
  job: {},
  bankInfo: [],
};

/* eslint-disable default-case, no-param-reassign */
const jobReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_BANK_INFO_SUCCESS:
        draft.bankInfo = action.response;
        break;
      case GET_BANK_INFO_FAIL:
        draft.bankInfo = action.error;
        break;
      case GET_ROOM_SUCCESS:
        draft.room = action.response;
        break;
      case PUT_JOB:
        draft.job = action.response;
        break;
      case GET_ROOM_FAIL:
        draft.room = action.error;
        break;
      case POST_JOB_SUCCESS:
        draft.room = action.response;
        draft.jobErrorNuber = 2;
        break;
      case POST_JOB_FAIL:
        draft.jobError = action.error.errors[0];
        draft.showError = true;
        draft.jobErrorNuber = 1;
        break;
      case CHANGE_STORE_DATA:
        draft[action.key] = action.value;
        break;
    }
  });

export default jobReducer;
