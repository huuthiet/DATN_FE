import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';
import { urlLink } from '../../helper/route';
import { loadRepos, reposLoaded } from '../App/actions';
import {
  getOrderPayFail,
  getOrderPaySuccess,
  getMasterDataBankUserSuccess,
  getMasterDataBankUserFail,
} from './actions';
import { GET_ORDERPAY, ADD_BANK_USER } from './constants';

export function* apiGetOrderDetail(payload) {
  const { id } = payload;
  const requestUrl =
    urlLink.api.serverUrl + urlLink.api.adminGetOrderDetail + id;
  yield put(loadRepos());
  try {
    const response = yield axios.get(requestUrl);
    yield put(getOrderPaySuccess(response.data.data));
  } catch (error) {
    yield put(getOrderPayFail(error.response.data));
  } finally {
    yield put(reposLoaded());
  }
}

export function* apiGetMasterBankNameUser(payload) {
  const requestUrl = `${urlLink.api.serverUrl +
    urlLink.api.postBankNameList}/user`;

  yield put(loadRepos());
  try {
    const response = yield axios.get(requestUrl);
    yield put(getMasterDataBankUserSuccess(response.data.data));
  } catch (error) {
    yield put(getMasterDataBankUserFail(error.response.data));
  } finally {
    yield put(reposLoaded());
  }
}

// Individual exports for testing
export default function* profileSaga() {
  yield takeLatest(GET_ORDERPAY, apiGetOrderDetail);
  yield takeLatest(ADD_BANK_USER, apiGetMasterBankNameUser);
}
