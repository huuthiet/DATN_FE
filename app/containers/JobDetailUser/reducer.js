/*
 *
 * JobDetail reducer
 *
 */
import produce from 'immer';
import { GET_PROFILE_SUCCESS } from '../Profile/constants';
import {
  CHANGE_STORE_DATA,
  GET_JOB_FAIL,
  GET_JOB_SUCCESS,
  GET_DATA_SUCCESS,
  GET_DATA_FAIL,
  PUT_JOB_FAIL,
  PUT_DEPOSIT_FAIL,
  PUT_DEPOSIT_SUCCESS,
  GET_BANK_INFO_SUCCESS,
  GET_BANK_INFO_FAIL,
  POST_TRANSACTION_SUCCESS,
  POST_TRANSACTION_FAIL,
} from './constants';

import { GET_ROOM_SUCCESS, GET_ROOM_FAIL } from '../RoomDetail/constants';


export const initialState = {
  // room: {},
  // roomErrors: [],
  profile: {},
  job: {},
  dataEnergy: {},
  jobErrors: 0,
  flagDeposit: false,
  bankInfo: [],
  transaction: {}
};

/* eslint-disable default-case, no-param-reassign */
const jobDetailReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_BANK_INFO_SUCCESS:
        draft.bankInfo = action.response;
        break;
      case GET_BANK_INFO_FAIL:
        draft.bankInfo = action.error;
        break;
      case GET_DATA_SUCCESS:
        draft.dataEnergy = action.response;
        break;
      case GET_DATA_FAIL:
        draft.dataEnergy = action.error.errors;
        break;
      case POST_TRANSACTION_SUCCESS:
        draft.transaction = action.response;
        break;
      case POST_TRANSACTION_FAIL:
        break;
      case GET_JOB_SUCCESS:
        draft.job = action.response;
        break;
      case GET_JOB_FAIL:
        draft.job = action.error.errors;
        draft.jobErrors = 1;
        break;
      case PUT_DEPOSIT_FAIL:
        draft.flagDeposit = true;
        break;
      case PUT_DEPOSIT_SUCCESS:
        draft.flagDeposit = false;
        break;
      case GET_PROFILE_SUCCESS:
        draft.profile = action.response;
        break;
      case PUT_JOB_FAIL:
        draft.jobErrors = 1;
        alert(action.error.errorMessage);
        break;
      case CHANGE_STORE_DATA:
        draft[action.key] = action.value;
        break;
    }
  });

export default jobDetailReducer;
