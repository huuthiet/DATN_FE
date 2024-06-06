import { put, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import axios from 'axios';
import {
  GET_PENDING_ACCEPT_BANKING_CASH_LIST,
  APPROVE_WITHDRAW_REQUEST,
} from './constants';
import { urlLink } from '../../helper/route';
import {
  getPendingAcceptBankingCashListSuccess,
  getPendingAcceptBankingCashListFail,
  getPendingAcceptBankingCashList,
} from './actions';
import { loadRepos, reposLoaded } from '../App/actions';


export function* apiGetPendingAcceptBankingCashList() {
  const requestUrl = urlLink.api.serverUrl + urlLink.api.getWithdrawalListAdmin;
  yield put(loadRepos());
  try {
    const response = yield axios.get(requestUrl);
    yield put(getPendingAcceptBankingCashListSuccess(response.data.data));
  } catch (error) {
    yield put(getPendingAcceptBankingCashListFail(error.response.data));
    toast.error(
      error.response.data.errors[0].errorMessage,
      {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
        hideProgressBar: false,
        pauseOnHover: true,
        draggable: true,
      },
    );
  } finally {
    yield put(reposLoaded());
  }
}

export function* apiApproveWithdrawRequest(payload) {
  if (payload.status === "approve") {
    console.log("payload", payload);
    const requestUrl = urlLink.api.serverUrl + urlLink.api.putApproveWithdrawRequestAdmin.replace(':id', payload.idTransaction);
    console.log("requestUrl", requestUrl);
    yield put(loadRepos());
    try {
      const response = yield axios.put(requestUrl);
      console.log("response", response);
      yield put(getPendingAcceptBankingCashList(response.data.data));
    } catch (error) {
      yield put(getPendingAcceptBankingCashListFail(error.response.data));
    } finally {
      yield put(reposLoaded());
    }
  }
  if (payload.status === "reject") {
    console.log("payload", payload);
    const requestUrl = urlLink.api.serverUrl + urlLink.api.putRejectWithdrawRequestAdmin.replace(':id', payload.idTransaction);
    console.log("requestUrl", requestUrl);
    yield put(loadRepos());
    try {
      const response = yield axios.put(requestUrl);
      console.log("response", response);
      yield put(getPendingAcceptBankingCashList(response.data.data));
    } catch (error) {
      yield put(getPendingAcceptBankingCashListFail(error.response.data));
    } finally {
      yield put(reposLoaded());
    }
  }
}

// Individual exports for testing
export default function* pendingAcceptBankingCashListSaga() {
  yield takeLatest(
    GET_PENDING_ACCEPT_BANKING_CASH_LIST,
    apiGetPendingAcceptBankingCashList
  );
  yield takeLatest(
    APPROVE_WITHDRAW_REQUEST,
    apiApproveWithdrawRequest
  );
}
