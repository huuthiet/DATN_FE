/*
 *
 * HostMotelRoom actions
 *
 */

import {
  DEFAULT_ACTION,
  GET_HISTORY_ENERGY_PER_MONTH_SUCCESS,
  GET_HISTORY_ENERGY_PER_MONTH,
  GET_HISTORY_ENERGY_PER_MONTH_FAIL,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}
export function getHistoryEnergyPerMonth(data) {
  return {
    type: GET_HISTORY_ENERGY_PER_MONTH,
    data,
  };
}

export function getHistoryEnergyPerMonthSuccess(response) {
  return {
    type: GET_HISTORY_ENERGY_PER_MONTH_SUCCESS,
    response,
  };
}

export function getHistoryEnergyPerMonthFail(error) {
  return {
    type: GET_HISTORY_ENERGY_PER_MONTH_FAIL,
    error,
  };
}