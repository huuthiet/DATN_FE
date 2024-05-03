/*
 *
 * JobVerify actions
 *
 */

import {
    PUT_IMAGES,
    PUT_IMAGES_SUCCESS,
    PUT_IMAGES_FAIL,
    CHANGE_STORE_DATA,
} from './constants';

export function putImages(id, idElectricMetter, formData) {
    return {
        type: PUT_IMAGES,
        id,
        idElectricMetter,
        formData,
    };
}

export function putImagesSuccess(response) {
    return {
        type: PUT_IMAGES_SUCCESS,
        response,
    };
}

export function putImagesFail(error) {
    return {
        type: PUT_IMAGES_FAIL,
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