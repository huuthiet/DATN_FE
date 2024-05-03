/*
 *
 * Profile reducer
 *
 */
import { Breadcrumbs } from '@material-ui/core';
import produce from 'immer';
import {
  CHANGE_STORE_DATA,
  GET_JOBS_SUCCESS,
  GET_JOBS_FAIL,
} from './constants';

export const initialState = {
  error: {},
  jobs: [],
  profile: {},
};

/* eslint-disable default-case, no-param-reassign */
const profileReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_JOBS_SUCCESS:
        draft.jobs = action.response.data;
        break;
      case GET_JOBS_FAIL:
        break;
      case CHANGE_STORE_DATA:
        draft[action.key] = action.value;
        break;
    }
  });

export default profileReducer;
