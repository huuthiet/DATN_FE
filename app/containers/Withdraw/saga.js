import { put, takeLatest } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import axios from 'axios';
import {
  GET_USER_BANK,
  GET_PROFILE,
  POST_REQUEST_WITHDRAW_USER
} from './constants';
import { urlLink } from '../../helper/route';
import {
  getUserBankSuccess,
  getUserBankFail,
  getProfileSuccess,
  getProfileFail,
  postRequestWithdrawUserSuccess,
  postRequestWithdrawUserFail,
} from './actions';
import { loadRepos, reposLoaded } from '../App/actions';


export function* apiGetProfile() {
  const requestUrl = urlLink.api.serverUrl + urlLink.api.profile;
  yield put(loadRepos());
  try {
    const response = yield axios.get(requestUrl);
    yield put(getProfileSuccess(response.data.data));
  } catch (error) {
    yield put(getProfileFail(error.response.data));
  } finally {
    yield put(reposLoaded());
  }
}

export function* apiGetUserBank() {
  const requestUrl = urlLink.api.serverUrl + urlLink.api.getBankUser;
  yield put(loadRepos());
  try {
    const response = yield axios.get(requestUrl);
    yield put(getUserBankSuccess(response.data.data));
  } catch (error) {
    yield put(getUserBankFail(error.response.data));
  } finally {
    yield put(reposLoaded());
  }
}

export function* apiPostRequestWithdrawUser(payload) {
  const data = payload.payload;
  const requestUrl =
    urlLink.api.serverUrl + urlLink.api.postRequestWithdraw + data.keyPayment;

  yield put(loadRepos());
  try {
    const response = yield axios.post(requestUrl, data);
    yield put(postRequestWithdrawUserSuccess(response.data.data));
    yield put(push(`/requestWithdraw/user/list`));
  } catch (error) {
    yield put(postRequestWithdrawUserFail(error.response.data));
  } finally {
    yield put(reposLoaded());
  }
}
// Individual exports for testing
export default function* withdrawSaga() {
  yield takeLatest(GET_PROFILE, apiGetProfile);
  yield takeLatest(GET_USER_BANK, apiGetUserBank);
  yield takeLatest(POST_REQUEST_WITHDRAW_USER, apiPostRequestWithdrawUser);
}
