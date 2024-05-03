import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { push } from 'react-router-redux';
import { urlLink } from '../../helper/route';
import { loadRepos, reposLoaded } from '../App/actions';
import {
  getMasterDataBankUserSuccess,
  getMasterDataBankUserFail,
  postPaymentUserFail,
  postPaymentUserSuccess,
} from './actions';
import { ADD_BANK_USER, POST_PAYMENT_USER } from './constants';

export function* apiGetMasterBankNameUser(payload) {
  // const requestUrl = `${urlLink.api.serverUrl +
  //   urlLink.api.postBankNameList}/user`;

  const requestUrl = urlLink.api.serverUrl + urlLink.api.getBankMasterList;

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

export function* apiPostPaymentUser(payload) {
  const data = payload.payload;
  const requestUrl =
    urlLink.api.serverUrl +
    urlLink.api.getTransactionPaymentList +
    data.keyPayment;

  yield put(loadRepos());
  try {
    const response = yield axios.post(requestUrl, data);
    yield put(postPaymentUserSuccess(response.data.data));
    yield put(push(`/transaction/user/list`));
  } catch (error) {
    yield put(postPaymentUserFail(error.response.data));
  } finally {
    yield put(reposLoaded());
  }
}
// Individual exports for testing
export default function* addMoneySaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(ADD_BANK_USER, apiGetMasterBankNameUser);
  yield takeLatest(POST_PAYMENT_USER, apiPostPaymentUser);
}
