/*
 *
 * Profile actions
 *
 */

import {
    CHANGE_STORE_DATA,
    GET_LIST_DEVICE_ENERGY,
    GET_LIST_DEVICE_ENERGY_SUCCESS,
    GET_LIST_DEVICE_ENERGY_FAIL
} from './constants';

export function getListDeviceEnergy() {
    return {
        type: GET_LIST_DEVICE_ENERGY,
    };
}

export function getListDeviceEnergySuccess(response) {
    return {
        type: GET_LIST_DEVICE_ENERGY_SUCCESS,
        response,
    };
}

export function getListDeviceEnergyFail(error) {
    return {
        type: GET_LIST_DEVICE_ENERGY_FAIL,
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
