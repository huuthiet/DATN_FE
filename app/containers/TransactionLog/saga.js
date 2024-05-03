import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';
import { urlLink } from '../../helper/route';
import { loadRepos, reposLoaded } from '../App/actions';
import { getGetOrderFail, getGetOrderSucces } from './actions';
import { GET_ORDER } from './constants';

export function* apiGetOrder(payload) {
  const _id = payload.payload;
  const requestUrl = urlLink.api.serverUrl + urlLink.api.getOrderDetail + _id;
  yield put(loadRepos());
  try {
    const response = yield axios.get(requestUrl);
    yield put(getGetOrderSucces(response.data));
  } catch (error) {
    console.log('apiGetOrder -> error', error.response.data);
    yield put(getGetOrderFail(error.response.data));
  } finally {
    yield put(reposLoaded());
  }
}
// Individual exports for testing
export default function* TransactionLogSaga() {
  yield takeLatest(GET_ORDER, apiGetOrder);
}
