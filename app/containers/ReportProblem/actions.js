/*
 *
 * ReportProblem actions
 *
 */

import {
  DEFAULT_ACTION,
  GET_JOB_DETAIL,
  GET_JOB_DETAIL_SUCCESS,
  GET_JOB_DETAIL_FAIL,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}
export function getJobDetail(payload) {
  return {
    type: GET_JOB_DETAIL,
    payload,
  };
}

export function getJobDetailSuccess(response) {
  return {
    type: GET_JOB_DETAIL_SUCCESS,
    response,
  };
}

export function getJobDetailFail(error) {
  return {
    type: GET_JOB_DETAIL_FAIL,
    error,
  };
}
