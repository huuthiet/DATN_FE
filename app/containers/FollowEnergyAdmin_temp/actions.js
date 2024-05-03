/*
 *
 * Profile actions
 *
 */

import {
    CHANGE_STORE_DATA,
    GET_DATA_ENERGY_PER_HOUR,
    GET_DATA_ENERGY_PER_HOUR_SUCCESS,
    GET_DATA_ENERGY_PER_HOUR_FAIL,
    GET_DATA_ENERGY_PER_DAY,
    GET_DATA_ENERGY_PER_DAY_SUCCESS,
    GET_DATA_ENERGY_PER_DAY_FAIL
} from './constants';

export function getDataEnergyPerHour(id) {
    return {
        type: GET_DATA_ENERGY_PER_HOUR,
        id,
    };
}

export function getDataEnergyPerHourSuccess(response) {
    return {
        type: GET_DATA_ENERGY_PER_HOUR_SUCCESS,
        response,
    };
}

export function getDataEnergyPerHourFail(error) {
    return {
        type: GET_DATA_ENERGY_PER_HOUR_FAIL,
        error,
    };
}


export function getDataEnergyPerDay(id) {
    return {
        type: GET_DATA_ENERGY_PER_DAY,
        id,
    };
}

export function getDataEnergyPerDaySuccess(response) {
    return {
        type: GET_DATA_ENERGY_PER_DAY_SUCCESS,
        response,
    };
}

export function getDataEnergyPerDayFail(error) {
    return {
        type: GET_DATA_ENERGY_PER_DAY_FAIL,
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
