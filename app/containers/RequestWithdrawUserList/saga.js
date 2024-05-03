import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { GET_REQUESTWITHDRAW_USER_LIST } from './constants';
import { urlLink } from '../../helper/route';
import {
  getRequestWithdrawUserListSuccess,
  getRequestWithdrawUserListFail,
} from './actions';
import { loadRepos, reposLoaded } from '../App/actions';
// import { take, call, put, select } from 'redux-saga/effects';
export function* apiGetRequestWithdrawUserList() {
  const requestUrl =
    urlLink.api.serverUrl + urlLink.api.getRequestWithdrawUserList;

  yield put(loadRepos());
  try {
    const response = yield axios.get(requestUrl);
    yield put(getRequestWithdrawUserListSuccess(response.data.data));
  } catch (error) {
    yield put(getRequestWithdrawUserListFail(error.response.data));
  } finally {
    yield put(reposLoaded());
  }
}

// Individual exports for testing
export default function* requestWithdrawListSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(
    GET_REQUESTWITHDRAW_USER_LIST,
    apiGetRequestWithdrawUserList,
  );
}
