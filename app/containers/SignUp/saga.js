import axios from 'axios';
import localStoreService from 'local-storage';
import { push } from 'react-router-redux';
import { put, takeLatest } from 'redux-saga/effects';
import { urlLink } from '../../helper/route';
import { loadRepos, reposLoaded } from '../App/actions';
import {
  getResendOTPFail,
  getResendOTPSuccess,
  postConfirmOTPFail,
  postConfirmOTPSuccess,
  postSignUpFail,
  postSignUpSuccess,
} from './actions';
import { GET_RESEND_OTP, POST_CONFIRM_OTP, POST_SIGN_UP } from './constants';

export function* apiPostSignUp(payload) {
  const { payload: data = {} } = payload;
  const requestUrl = urlLink.api.serverUrl + urlLink.api.auth.sign_up;

  yield put(loadRepos());
  try {
    const response = yield axios.post(requestUrl, data);
    // gui xác nhận
    // const response1 = yield axios.put(requestUrl_Email, data);
    const {
      data: userSignUp = {
        token: '',
      },
    } = response.data;
    yield (axios.defaults.headers.common.Authorization = `Bearer ${
      userSignUp.token
    }`);
    // yield localStoreService.set('token', userSignUp.token);
    // yield localStoreService.set('user', userSignUp);
    yield put(postSignUpSuccess(userSignUp));
    // yield put(saveCurrentUser(userSignUp));
    // Chuyen vê log in
    yield put(push('/auth/login'));
  } catch (error) {
    if (error.response) {
      const { data: errors = {} } = error.response;
      yield put(postSignUpFail(errors));
    } else {
      const offlineData = {
        data: [],
        error: true,
        errors: [
          { errorCode: 4, errorMessage: 'Error: 500 server internal error' },
        ],
      };
      yield put(postSignUpFail(offlineData));
    }
  } finally {
    yield put(reposLoaded());
  }
}

export function* apiPostConfirmOTP(payload) {
  const { code } = payload.payload;
  const requestUrl = urlLink.api.serverUrl + urlLink.api.auth.confirmOTP;
  yield put(loadRepos());
  try {
    const response = yield axios.post(requestUrl, { code });
    yield put(postConfirmOTPSuccess(response.data.data));
    yield put(push(urlLink.home));
  } catch (error) {
    yield put(postConfirmOTPFail(error.response.data));
  } finally {
    yield put(reposLoaded());
  }
}

export function* apiGetResendOTP() {
  const config = {
    headers: {
      Authorization: `Bearer ${localStoreService.get('user').token}`,
    },
  };
  const requestUrl = urlLink.api.serverUrl + urlLink.api.auth.resendOTP;
  yield put(loadRepos());
  try {
    const response = yield axios.get(requestUrl, config);
    yield put(getResendOTPSuccess(response.data.data));
  } catch (error) {
    yield put(getResendOTPFail(error.response.data));
  } finally {
    yield put(reposLoaded());
  }
}
// Individual exports for testing
export default function* signUpSaga() {
  yield takeLatest(POST_SIGN_UP, apiPostSignUp);
  yield takeLatest(POST_CONFIRM_OTP, apiPostConfirmOTP);
  yield takeLatest(GET_RESEND_OTP, apiGetResendOTP);
}
