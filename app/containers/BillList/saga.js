import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';
import { urlLink } from '../../helper/route';
import { loadRepos, reposLoaded } from '../App/actions';
import { getListBillFail, getListBillSuccess } from './actions';
import { GET_LIST_BILL } from './constants';

export function* apiGetListBill(payload) {
  const { data } = payload;
  const requestUrl = `${urlLink.api.serverUrl}${urlLink.api.bill}`;
  yield put(loadRepos());
  try {
    const response = yield axios.get(requestUrl, {
      params: data,
    });
    yield put(getListBillSuccess(response.data.data.data));
  } catch (error) {
    yield put(getListBillFail(error.response.data));
  } finally {
    yield put(reposLoaded());
  }
}
// Individual exports for testing
export default function* BillListSaga() {
  yield takeLatest(GET_LIST_BILL, apiGetListBill);
}
