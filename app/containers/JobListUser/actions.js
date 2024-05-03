/*
 *
 * JobList actions
 *
 */

import {
  DEFAULT_ACTION,
  GET_JOB_LIST_USER_SUCCESS,
  GET_JOB_LIST_USER_FAIL,
  GET_JOB_LIST_USER,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function getJobListUser(id) {
  return {
    type: GET_JOB_LIST_USER,
    id,
  };
}

export function getJobListUserSuccess(response) {
  return {
    type: GET_JOB_LIST_USER_SUCCESS,
    response,
  };
}

export function getJobListUserFail(error) {
  return {
    type: GET_JOB_LIST_USER_FAIL,
    error,
  };
}
