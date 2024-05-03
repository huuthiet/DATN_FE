import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { GET_TRANSACTIONPAYMENT_USER_LIST } from './constants';
import { urlLink } from '../../helper/route';
import {
  getTransactionPayMentUserListSuccess,
  getTransactionPayMentUserListFail,
} from './actions';
import { loadRepos, reposLoaded } from '../App/actions';
// import { take, call, put, select } from 'redux-saga/effects';
export function* apiGetTransactionPaymentUserList() {
  const requestUrl =
    urlLink.api.serverUrl + urlLink.api.getTransactionPaymentUserList;
  yield put(loadRepos());
  try {
    const response = yield axios.get(requestUrl);
    yield put(getTransactionPayMentUserListSuccess(response.data.data));
  } catch (error) {
    yield put(getTransactionPayMentUserListFail(error.response.data));
  } finally {
    yield put(reposLoaded());
  }
}

// Individual exports for testing
export default function* transactionPaymentListSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(
    GET_TRANSACTIONPAYMENT_USER_LIST,
    apiGetTransactionPaymentUserList,
  );
}
