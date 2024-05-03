import { put, takeLatest } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import axios from 'axios';
import {
  GET_ORDER_DETAIL,
  PUT_ORDER_DETAIL,
  DELETE_ORDER_DETAIL,
} from './constants';
import { urlLink } from '../../helper/route';
import {
  getOrderDetailSuccess,
  getOrderDetailFail,
  putOrderDetailSuccess,
  putOrderDetailFail,
  deleteOrderDetailSuccess,
  deleteOrderDetailFail,
} from './actions';
import { loadRepos, reposLoaded } from '../App/actions';
// Individual exports for testing
export function* apiGetOrderDetail(payload) {
  const { id } = payload;
  const requestUrl =
    urlLink.api.serverUrl + urlLink.api.adminGetOrderDetail + id;
  yield put(loadRepos());
  try {
    const response = yield axios.get(requestUrl);
    yield put(getOrderDetailSuccess(response.data.data));
  } catch (error) {
    yield put(getOrderDetailFail(error.response.data));
  } finally {
    yield put(reposLoaded());
  }
}

export function* apiPutOrderDetail(payload) {
  const { id, amount } = payload.data;
  const requestUrl =
    urlLink.api.serverUrl + urlLink.api.adminGetOrderDetail + id;
  yield put(loadRepos());
  try {
    const response = yield axios.put(requestUrl, { amount });
    yield put(putOrderDetailSuccess(response.data.data));
  } catch (error) {
    yield put(putOrderDetailFail(error.response.data));
  } finally {
    yield put(reposLoaded());
  }
}

export function* apiDeleteOrderDetail(payload) {
  const { id } = payload.data;
  const requestUrl =
    urlLink.api.serverUrl + urlLink.api.adminGetOrderDetail + id;
  yield put(loadRepos());
  try {
    const response = yield axios.delete(requestUrl);
    yield put(deleteOrderDetailSuccess(response.data));
  } catch (error) {
    yield put(deleteOrderDetailFail(error.response.data));
  } finally {
    yield put(push(urlLink.orderList));
    yield put(reposLoaded());
  }
}

export default function* orderDetailSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(GET_ORDER_DETAIL, apiGetOrderDetail);
  yield takeLatest(PUT_ORDER_DETAIL, apiPutOrderDetail);
  yield takeLatest(DELETE_ORDER_DETAIL, apiDeleteOrderDetail);
}
