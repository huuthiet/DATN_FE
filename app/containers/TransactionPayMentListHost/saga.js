import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import {
  GET_TRANSACTIONPAYMENT_LIST,
  PUT_TRANSACTIONPAYMENT_LIST,
} from './constants';
import { urlLink } from '../../helper/route';
import {
  getTransactionPayMentListHostSuccess,
  getTransactionPayMentListHostFail,
  approveAdminTransactionPaymentSuccess,
  approveAdminTransactionPaymentFail,
  getTransactionPayMentListHost,
} from './actions';
import { loadRepos, reposLoaded } from '../App/actions';
// import { take, call, put, select } from 'redux-saga/effects';
export function* apiGetTransactionPaymentListHost() {
  const requestUrl = urlLink.api.serverUrl + urlLink.api.transactionsHost;
  yield put(loadRepos());
  try {
    const response = yield axios.get(requestUrl);
    yield put(getTransactionPayMentListHostSuccess(response.data.data));
  } catch (error) {
    yield put(getTransactionPayMentListHostFail(error.response.data));
  } finally {
    yield put(reposLoaded());
  }
}

export function* apiPutTransactionPaymentApprove(payload) {
  const requestUrl =
    urlLink.api.serverUrl + urlLink.api.transactionsHost + '/' + payload.id;
  yield put(loadRepos());
  try {
    const response = yield axios.put(requestUrl, payload);
    yield put(approveAdminTransactionPaymentSuccess(response.data));
    yield put(getTransactionPayMentListHost());
  } catch (error) {
    yield put(approveAdminTransactionPaymentFail(error));
  } finally {
    yield put(reposLoaded());
  }
}
// Individual exports for testing
export default function* transactionPaymentListHostSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(
    GET_TRANSACTIONPAYMENT_LIST,
    apiGetTransactionPaymentListHost,
  );
  yield takeLatest(
    PUT_TRANSACTIONPAYMENT_LIST,
    apiPutTransactionPaymentApprove,
  );
}
