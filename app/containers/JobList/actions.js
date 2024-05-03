/*
 *
 * JobList actions
 *
 */

import {
  DEFAULT_ACTION,
  GET_JOB_LIST_SUCCESS,
  GET_JOB_LIST_FAIL,
  GET_JOB_LIST,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function getJobList() {
  return {
    type: GET_JOB_LIST,
  };
}

export function getJobListSuccess(response) {
  return {
    type: GET_JOB_LIST_SUCCESS,
    response,
  };
}

export function getJobListFail(error) {
  return {
    type: GET_JOB_LIST_FAIL,
    error,
  };
}
