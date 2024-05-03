/*
 *
 * JobVerify reducer
 *
 */
import produce from 'immer';
import { CHANGE_STORE_DATA, PUT_IMAGES_SUCCESS } from './constants';

export const initialState = {
    images: [],
};

/* eslint-disable default-case, no-param-reassign */
const jobVerifyReducer = (state = initialState, action) =>
    produce(state, draft => {
        switch (action.type) {
            case CHANGE_STORE_DATA:
                draft[action.key] = action.value;
                break;
            case PUT_IMAGES_SUCCESS:
                draft.images = action.images;
                break;
        }
    });

export default jobVerifyReducer;