/*
 *
 * ReportProblemListAdmin actions
 *
 */

import {
  DEFAULT_ACTION,
  GET_LIST_REPORT_PROBLEM_SUCCESS,
  GET_LIST_REPORT_PROBLEM,
  GET_LIST_REPORT_PROBLEM_FAIL,
  POST_STATUS_REPORT_PROBLEM,
  POST_STATUS_REPORT_PROBLEM_FAIL,
  POST_STATUS_REPORT_PROBLEM_SUCCESS,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}
export function getListReportProblem(data) {
  return {
    type: GET_LIST_REPORT_PROBLEM,
    data,
  };
}

export function getListReportProblemSuccess(response) {
  return {
    type: GET_LIST_REPORT_PROBLEM_SUCCESS,
    response,
  };
}

export function getListReportProblemFail(error) {
  return {
    type: GET_LIST_REPORT_PROBLEM_FAIL,
    error,
  };
}
export function postStatusReportProblem(data) {
  return {
    type: POST_STATUS_REPORT_PROBLEM,
    data,
  };
}

export function postStatusReportProblemSuccess(response) {
  return {
    type: POST_STATUS_REPORT_PROBLEM_SUCCESS,
    response,
  };
}

export function postStatusReportProblemFail(error) {
  return {
    type: POST_STATUS_REPORT_PROBLEM_FAIL,
    error,
  };
}
