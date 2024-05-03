import { put, takeLatest } from 'redux-saga/effects';
import localStoreService from 'local-storage';
import axios from 'axios';
import { push } from 'react-router-redux';
import { POST_ACTIVE_USER } from './constants';
import { urlLink } from '../../helper/route';
import { postActiveUserSuccess, postActiveUserFail } from './actions';
import { loadRepos, reposLoaded, saveCurrentUser } from '../App/actions';

export function* apiPostActiveUser(payload) {

    const requestUrl = urlLink.api.serverUrl + urlLink.api.auth.activeUser;

    const data = {
        email: payload.payload.email,
        barcode: payload.payload.barcode
    }

    yield put(loadRepos());
    try {
        const response = yield axios.put(requestUrl, data);
        yield put(postActiveUserSuccess(response));
    } catch (error) {
        if (error.response) {
            const { data: errors = {} } = error.response;
            yield put(postActiveUserFail(errors));
        } else {
            const offlineData = {
                data: [],
                error: true,
                errors: [
                    { errorCode: 4, errorMessage: 'Error: 500 server internal error' },
                ],
            };
            yield put(postActiveUserFail(offlineData));
        }

    } finally {
        yield put(reposLoaded());
    }
}

// Individual exports for testing
export default function* activeUserPageSaga() {
    yield takeLatest(POST_ACTIVE_USER, apiPostActiveUser);
}