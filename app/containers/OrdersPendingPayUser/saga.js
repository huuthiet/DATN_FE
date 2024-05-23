import { put, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import axios from 'axios';
import { GET_PENDING_ACCEPT_BANKING_CASH_LIST } from './constants';
import { urlLink } from '../../helper/route';
import {
  getPendingAcceptBankingCashListSuccess,
  getPendingAcceptBankingCashListFail,
  getPendingAcceptBankingCashList,
} from './actions';
import { loadRepos, reposLoaded } from '../App/actions';

export function* apiGetPendingAcceptBankingCashList() {
  const requestUrl =
    urlLink.api.serverUrl + urlLink.api.getOrderPendingPaymentList;
  yield put(loadRepos());
  try {
    const response = yield axios.get(requestUrl);
    console.log({ response });
    yield put(getPendingAcceptBankingCashListSuccess(response.data.data));
  } catch (error) {
    yield put(getPendingAcceptBankingCashListFail(error.response.data));
    toast.error(error.response.data.errors[0].errorMessage, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 3000,
      hideProgressBar: false,
      pauseOnHover: true,
      draggable: true,
    });
  } finally {
    yield put(reposLoaded());
  }
}

// Individual exports for testing
export default function* pendingAcceptBankingCashListSaga() {
  yield takeLatest(
    GET_PENDING_ACCEPT_BANKING_CASH_LIST,
    apiGetPendingAcceptBankingCashList,
  );
}
