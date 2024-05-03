import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import {
  GET_REQUESTWITHDRAW_LIST,
  PUT_REQUESTWITHDRAW_LIST,
} from './constants';
import { urlLink } from '../../helper/route';
import {
  getRequestWithdrawList,
  getRequestWithdrawListSuccess,
  getRequestWithdrawListFail,
  approveAdminRequestWithdrawSuccess,
  approveAdminRequestWithdrawFail,
} from './actions';
import { loadRepos, reposLoaded } from '../App/actions';
// import { take, call, put, select } from 'redux-saga/effects';

export function* apiGetRequestWithdrawList() {
  const requestUrl = urlLink.api.serverUrl + urlLink.api.getRequestWithdrawList;
    // getRequestWithdrawUserList
    // getTransactionPaymentUserList
  yield put(loadRepos());
  try {
    const response = yield axios.get(requestUrl);
    yield put(getRequestWithdrawListSuccess(response.data.data.data));
  } catch (error) {
    yield put(getRequestWithdrawListFail(error.response.data));
  } finally {
    yield put(reposLoaded());
  }
}

export function* apiPutRequestWithdrawApprove(payload) {
  const requestUrl =
    urlLink.api.serverUrl + urlLink.api.getRequestWithdrawList + payload.id;
  yield put(loadRepos());
  try {
    const response = yield axios.put(requestUrl, payload);
    yield put(approveAdminRequestWithdrawSuccess(response.data));
    yield put(getRequestWithdrawList());
  } catch (error) {
    yield put(approveAdminRequestWithdrawFail(error));
  } finally {
    yield put(reposLoaded());
  }
}

// Individual exports for testing
export default function* requestWithdrawListSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(GET_REQUESTWITHDRAW_LIST, apiGetRequestWithdrawList);
  yield takeLatest(PUT_REQUESTWITHDRAW_LIST, apiPutRequestWithdrawApprove);
}
