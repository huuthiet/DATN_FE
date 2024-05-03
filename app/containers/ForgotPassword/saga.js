import { put, takeLatest } from 'redux-saga/effects';
import localStoreService from 'local-storage';
import axios from 'axios';
import { push } from 'react-router-redux';
import { POST_FORGOT_PASSWORD, GET_USER } from './constants';
import { urlLink } from '../../helper/route';
import { postForgotPasswordSuccess, postForgotPasswordFail } from './actions';
import { loadRepos, reposLoaded, saveCurrentUser } from '../App/actions';

export function* apiPostForgotPassword(payload) {

    const requestUrl = urlLink.api.serverUrl + urlLink.api.auth.forgotPassword;

    const data = {
        email: payload.payload.email,
    }
    yield put(loadRepos());
    try {
        const response = yield axios.put(requestUrl, data);
        yield put(postForgotPasswordSuccess(response));
    } catch (error) {
        if (error.response) {
            const { data: errors = {} } = error.response;
            yield put(postForgotPasswordFail(errors));
        } else {
            const offlineData = {
                data: [],
                error: true,
                errors: [
                    { errorCode: 4, errorMessage: 'Error: 500 server internal error' },
                ],
            };
            yield put(postForgotPasswordFail(offlineData));
        }

    } finally {
        yield put(reposLoaded());
    }
}

export function* apiGetUser() {
        const requestUrl = urlLink.api.serverUrl + urlLink.api.getRoomList;

        // yield put(loadRepos());
        // try {
        //     const response = yield axios.get(requestUrl);
        //     yield put(getMotelListSuccess(response.data.data.data));
        // } catch (error) {
        //     yield put(getMotelListFail(error.response.data));
        // } finally {
        //     yield put(reposLoaded());
        // }
    }
    // Individual exports for testing
export default function* forgotPasswordPageSaga() {
    yield takeLatest(POST_FORGOT_PASSWORD, apiPostForgotPassword);
    yield takeLatest(GET_USER, apiGetUser);
}