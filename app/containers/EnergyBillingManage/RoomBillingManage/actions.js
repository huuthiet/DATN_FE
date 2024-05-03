import {
  GET_DATA_ENERGY_PER_MONTH_SUCCESS,
  GET_DATA_ENERGY_PER_MONTH_ERROR,
  GET_DATA_ENERGY_PER_MONTH,
} from './constants';

export function getDataEnergyPerMonthSuccess(response) {
  return {
    type: GET_DATA_ENERGY_PER_MONTH_SUCCESS,
    response,
  };
}

export function getDataEnergyPerMonthError(error) {
  return {
    type: GET_DATA_ENERGY_PER_MONTH_ERROR,
    error,
  };
}

export function getDataEnergyPerMonth(id) {
  return {
    type: GET_DATA_ENERGY_PER_MONTH,
    id,
  };
}
