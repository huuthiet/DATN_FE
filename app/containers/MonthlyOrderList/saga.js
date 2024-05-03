import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { GET_MONTHLY_ORDER_LIST } from './constants';
import { urlLink } from '../../helper/route';
import { getMonthlyOrderListSuccess, getMonthlyOrderListFail } from './actions';
import { loadRepos, reposLoaded } from '../App/actions';
// import { take, call, put, select } from 'redux-saga/effects';

export function* apiGetMonthlyOrderList() {
  const requestUrl = urlLink.api.serverUrl + urlLink.api.monthlyGetOrderList;
  yield put(loadRepos());
  try {
    const response = yield axios.get(requestUrl);
    yield put(getMonthlyOrderListSuccess(response.data.data));
  } catch (error) {
    yield put(getMonthlyOrderListFail(error.response.data));
  } finally {
    yield put(reposLoaded());
  }
}
// Individual exports for testing
export default function* monthlyOrderListSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(GET_MONTHLY_ORDER_LIST, apiGetMonthlyOrderList);
}
