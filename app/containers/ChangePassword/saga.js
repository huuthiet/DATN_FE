import { put, takeLatest } from 'redux-saga/effects';
import localStoreService from 'local-storage';
import axios from 'axios';
import { push } from 'react-router-redux';
import { POST_CHANGE_PASSWORD } from './constants';
import { urlLink } from '../../helper/route';
import { postChangePasswordSuccess, postChangePasswordFail } from './actions';
import { loadRepos, reposLoaded, saveCurrentUser } from '../App/actions';

export function* apiPostChangePassword(payload) {
  const requestUrl = urlLink.api.serverUrl + urlLink.api.auth.changePassword;

  const data = {
    passwordOld: payload.payload.passwordOld,
    password: payload.payload.password,
    _id: payload.payload._id,
  };

  yield put(loadRepos());
  try {
    const response = yield axios.put(requestUrl, data);
    yield put(postChangePasswordSuccess(response));
    yield (axios.defaults.headers.common.Authorization = '');
    yield put(saveCurrentUser(''));
    yield window.localStorage.clear();
    yield window.sessionStorage.clear();
    yield put(reposLoaded());
    yield put(push(`/`));
  } catch (error) {
    if (error.response) {
      const { data: errors = {} } = error.response;
      yield put(postChangePasswordFail(errors));
    } else {
      const offlineData = {
        data: [],
        error: true,
        errors: [
          { errorCode: 4, errorMessage: 'Error: 500 server internal error' },
        ],
      };
      yield put(postChangePasswordFail(offlineData));
    }
  } finally {
    yield put(reposLoaded());
  }
}
// Individual exports for testing
export default function* changePasswordPageSaga() {
  yield takeLatest(POST_CHANGE_PASSWORD, apiPostChangePassword);
}
