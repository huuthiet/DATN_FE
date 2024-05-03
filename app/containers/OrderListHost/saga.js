import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { GET_ORDER_LIST } from './constants';
import { urlLink } from '../../helper/route';
import { getOrderListHostSuccess, getOrderListHostFail } from './actions';
import { loadRepos, reposLoaded } from '../App/actions';
// import { take, call, put, select } from 'redux-saga/effects';
export function* apiGetOrderListHost() {
  const requestUrl = urlLink.api.serverUrl + urlLink.api.hostGetOrderList;
  yield put(loadRepos());
  try {
    const response = yield axios.get(requestUrl);
    yield put(getOrderListHostSuccess(response.data.data));
  } catch (error) {
    yield put(getOrderListHostFail(error.response.data));
  } finally {
    yield put(reposLoaded());
  }
}
// Individual exports for testing
export default function* orderListHostSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(GET_ORDER_LIST, apiGetOrderListHost);
}
