import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { push } from 'react-router-redux';
import { urlLink } from '../../helper/route';
import { loadRepos, reposLoaded } from '../App/actions';
import {
  addBankSuccess,
  addBankFail,
  getDetailBankFail,
  getDetailBankSuccess,
  getMasterDataBankSuccess,
  getMasterDataBankFail,
} from './actions';
import {
  ADD_BANK,
  GET_DETAIL_BANK,
  EDIT_BANK,
  GET_MASTER_BANK_BANK,
} from './constants';

// Individual exports for testing

export function* apiPostAddBank(payload) {
  const data = payload.payload;
  const requestUrl = urlLink.api.serverUrl + urlLink.api.postBankUser + data.id;
  yield put(loadRepos());
  try {
    const response = yield axios.post(requestUrl, data);
    yield put(addBankSuccess(response.data.data));
    yield put(push(`/money-information`));
  } catch (error) {
    yield put(addBankFail(error.response.data));
  } finally {
    yield put(reposLoaded());
  }
}

export function* apiGetDetailBank(payload) {
  const id = payload.payload;
  const requestUrl = urlLink.api.serverUrl + urlLink.api.postBankUser + id;

  yield put(loadRepos());
  try {
    const response = yield axios.get(requestUrl);
    yield put(getDetailBankSuccess(response.data.data));
  } catch (error) {
    yield put(getDetailBankFail(error.response.data));
  } finally {
    yield put(reposLoaded());
  }
}

export function* apiGetMasterBankName(payload) {
  const requestUrl = urlLink.api.serverUrl + urlLink.api.getBankNameList;

  yield put(loadRepos());
  try {
    const response = yield axios.get(requestUrl);
    yield put(getMasterDataBankSuccess(response.data.data));
  } catch (error) {
    yield put(getMasterDataBankFail(error.response.data));
  } finally {
    yield put(reposLoaded());
  }
}

export default function* jobDetailSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(ADD_BANK, apiPostAddBank);
  yield takeLatest(EDIT_BANK, apiPostAddBank);
  yield takeLatest(GET_DETAIL_BANK, apiGetDetailBank);
  yield takeLatest(GET_MASTER_BANK_BANK, apiGetMasterBankName);
}
