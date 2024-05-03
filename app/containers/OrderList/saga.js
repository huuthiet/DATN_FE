import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { GET_ORDER_LIST } from './constants';
import { urlLink } from '../../helper/route';
import { getOrderListSuccess, getOrderListFail } from './actions';
import { loadRepos, reposLoaded } from '../App/actions';
// import { take, call, put, select } from 'redux-saga/effects';
export function* apiGetOrderList() {
  const requestUrl = urlLink.api.serverUrl + urlLink.api.adminGetOrderList;
  yield put(loadRepos());
  try {
    const response = yield axios.get(requestUrl);
    yield put(getOrderListSuccess(response.data.data));
  } catch (error) {
    yield put(getOrderListFail(error.response.data));
  } finally {
    yield put(reposLoaded());
  }
}
// Individual exports for testing
export default function* orderListSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(GET_ORDER_LIST, apiGetOrderList);
}
