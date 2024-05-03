/*
 *
 * SignUp reducer
 *
 */
import produce from 'immer';
import {
    POST_SIGN_UP_SUCCESS,
    POST_SIGN_UP_FAIL,
    CHANGE_STORE_DATA,
    POST_CONFIRM_OTP_SUCCESS,
    POST_CONFIRM_OTP_FAIL,
    GET_RESEND_OTP_SUCCESS,
    GET_RESEND_OTP_FAIL,
} from './constants';

export const initialState = {
    user: {},
    error: [],
    modal: false,
    otpError: '',
    action: 0,
};

/* eslint-disable default-case, no-param-reassign */
const signUpReducer = (state = initialState, action) =>
    produce(state, draft => {
        switch (action.type) {
            case POST_SIGN_UP_SUCCESS:
                draft.user = action.response;
                draft.modal = true;
                draft.action = 1;
                break;
            case POST_SIGN_UP_FAIL:
                draft.error = action.error.errors;
                draft.action = 2;
                break;
            case POST_CONFIRM_OTP_SUCCESS:
                draft.modal = false;
                break;
            case POST_CONFIRM_OTP_FAIL:
                draft.otpError = action.error.errors[0].errorMessage;
                break;
            case GET_RESEND_OTP_SUCCESS:
                draft.modal = true;
                draft.otpError = '';
                break;
            case GET_RESEND_OTP_FAIL:
                draft.otpError = action.error.errors[0].errorMessage;
                break;
            case CHANGE_STORE_DATA:
                draft[action.key] = action.value;
                break;
        }
    });

export default signUpReducer;