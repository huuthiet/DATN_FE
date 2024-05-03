import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { GET_ADMIN_BANK, DELETE_ADMIN_BANK } from './constants';
import { urlLink } from '../../helper/route';
import {
  getAdminBankSuccess,
  getAdminBankFail,
  getAdminBank,
  deleteAdminBankSuccess,
  deleteAdminBankFail,
} from './actions';
import { loadRepos, reposLoaded } from '../App/actions';
// import { take, call, put, select } from 'redux-saga/effects';
export function* apiGetAdminBank() {
  const requestUrl = urlLink.api.serverUrl + urlLink.api.getBankUser;
  yield put(loadRepos());
  try {
    const response = yield axios.get(requestUrl);
    yield put(getAdminBankSuccess(response.data.data));
  } catch (error) {
    yield put(getAdminBankFail(error.response.data));
  } finally {
    yield put(reposLoaded());
  }
}

export function* apiDeteteAdminBank(payload) {
  const { id } = payload;
  const requestUrl = urlLink.api.serverUrl + urlLink.api.deleteBankUser + id;
  yield put(loadRepos());
  try {
    const response = yield axios.delete(requestUrl);
    yield put(deleteAdminBankSuccess(response.data.data));
    yield put(getAdminBank());
  } catch (error) {
    yield put(deleteAdminBankFail(error.response.data));
  } finally {
    yield put(reposLoaded());
  }
}

// Individual exports for testing
export default function* MoneyInformationSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(GET_ADMIN_BANK, apiGetAdminBank);
  yield takeLatest(DELETE_ADMIN_BANK, apiDeteteAdminBank);
}
