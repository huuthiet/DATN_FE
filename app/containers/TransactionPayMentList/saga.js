import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import {
  GET_TRANSACTIONPAYMENT_LIST,
  PUT_TRANSACTIONPAYMENT_LIST,
} from './constants';
import { urlLink } from '../../helper/route';
import {
  getTransactionPayMentListSuccess,
  getTransactionPayMentListFail,
  approveAdminTransactionPaymentSuccess,
  approveAdminTransactionPaymentFail,
  getTransactionPayMentList,
} from './actions';
import { loadRepos, reposLoaded } from '../App/actions';
// import { take, call, put, select } from 'redux-saga/effects';
export function* apiGetTransactionPaymentList() {
  const requestUrl =
    urlLink.api.serverUrl + urlLink.api.getTransactionPaymentList;
  yield put(loadRepos());
  try {
    const response = yield axios.get(requestUrl);
    console.log('apiGetTransactionPaymentList -> response', response.data.data.data);
    yield put(getTransactionPayMentListSuccess(response.data.data.data));
  } catch (error) {
    yield put(getTransactionPayMentListFail(error.response.data));
  } finally {
    yield put(reposLoaded());
  }
}

export function* apiPutTransactionPaymentApprove(payload) {
  const requestUrl =
    urlLink.api.serverUrl + urlLink.api.getTransactionPaymentList + payload.id;
  yield put(loadRepos());
  try {
    const response = yield axios.put(requestUrl, payload);
    yield put(approveAdminTransactionPaymentSuccess(response.data));
    yield put(getTransactionPayMentList());
  } catch (error) {
    yield put(approveAdminTransactionPaymentFail(error));
  } finally {
    yield put(reposLoaded());
  }
}
// Individual exports for testing
export default function* transactionPaymentListSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(GET_TRANSACTIONPAYMENT_LIST, apiGetTransactionPaymentList);
  yield takeLatest(
    PUT_TRANSACTIONPAYMENT_LIST,
    apiPutTransactionPaymentApprove,
  );
}
