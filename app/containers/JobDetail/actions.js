/*
 *
 * JobDetail actions
 *
 */

import {
  DEFAULT_ACTION,
  GET_JOB_DETAIL,
  GET_JOB_DETAIL_SUCCESS,
  GET_JOB_DETAIL_FAIL,
  DELETE_JOB_DETAIL,
  DELETE_JOB_DETAIL_SUCCESS,
  DELETE_JOB_DETAIL_FAIL,
  CHANGE_STORE_DATA,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function getJobDetail(id) {
  return {
    type: GET_JOB_DETAIL,
    id,
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

export function deleteJobDetail(id) {
  return {
    type: DELETE_JOB_DETAIL,
    id,
  };
}

export function deleteJobDetailSuccess(response) {
  return {
    type: DELETE_JOB_DETAIL_SUCCESS,
    response,
  };
}

export function deleteJobDetailFail(error) {
  return {
    type: DELETE_JOB_DETAIL_FAIL,
    error,
  };
}

export function changeStoreData(key, value) {
  return {
    type: CHANGE_STORE_DATA,
    key,
    value,
  };
}
