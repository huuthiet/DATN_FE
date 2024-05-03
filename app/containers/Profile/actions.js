/*
 *
 * Profile actions
 *
 */

import {
  DEFAULT_ACTION,
  DELETE_MOTEL,
  DELETE_MOTEL_SUCCESS,
  DELETE_MOTEL_FAIL,
  GET_MOTEL_LIST,
  GET_MOTEL_LIST_SUCCESS,
  GET_MOTEL_LIST_FAIL,
  CHANGE_STORE_DATA,
  GET_JOBS_SUCCESS,
  GET_JOBS_FAIL,
  GET_JOBS,
  DELETE_JOB,
  DELETE_JOB_SUCCESS,
  DELETE_JOB_FAIL,
  GET_PROFILE,
  GET_PROFILE_SUCCESS,
  GET_PROFILE_FAIL,
  CLEAR_PROFILE_SUCCESS,
  CLEAR_PROFILE,
  CLEAR_PROFILE_FAIL,
} from './constants';

export function getProfile() {
  return {
    type: GET_PROFILE,
  };
}

export function getProfileSuccess(response) {
  return {
    type: GET_PROFILE_SUCCESS,
    response,
  };
}

export function getProfileFail(error) {
  return {
    type: GET_PROFILE_FAIL,
    error,
  };
}

export function getJobs() {
  return {
    type: GET_JOBS,
  };
}

export function getJobsSuccess(response) {
  return {
    type: GET_JOBS_SUCCESS,
    response,
  };
}

export function getJobsFail(error) {
  return {
    type: GET_JOBS_FAIL,
    error,
  };
}
export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function getMotelList() {
  return {
    type: GET_MOTEL_LIST,
  };
}
export function getMotelListSuccess(response) {
  return {
    type: GET_MOTEL_LIST_SUCCESS,
    response,
  };
}
export function getMotelListFail(error) {
  return {
    type: GET_MOTEL_LIST_FAIL,
    error,
  };
}

export function deleteMotel(id) {
  return {
    type: DELETE_MOTEL,
    id,
  };
}
export function deleteMotelSuccess(response) {
  return {
    type: DELETE_MOTEL_SUCCESS,
    response,
  };
}
export function deleteMotelFail(error) {
  return {
    type: DELETE_MOTEL_FAIL,
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
export function deleteJob(id) {
  return {
    type: DELETE_JOB,
    id,
  };
}

export function deleteJobSuccess(response) {
  return {
    type: DELETE_JOB_SUCCESS,
    response,
  };
}

export function clearProfile(response) {
  return {
    type: CLEAR_PROFILE,
    response,
  };
}
export function clearProfileSuccess(response) {
  return {
    type: CLEAR_PROFILE_SUCCESS,
    response,
  };
}
export function clearProfileFail(response) {
  return {
    type: CLEAR_PROFILE_FAIL,
    response,
  };
}

export function deleteJobFail(error) {
  return {
    type: DELETE_JOB_FAIL,
    error,
  };
}
