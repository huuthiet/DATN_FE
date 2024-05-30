import { put, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import axios from 'axios';
import {
  GET_LIST_ORDER_NO_PAY_OF_PAY_DEPOSIT,
} from './constants';
import { urlLink } from '../../helper/route';
import {
  getListOrderNoPaySuccess,
  getListOrderNoPayFail,
} from './actions';
import { loadRepos, reposLoaded } from '../App/actions';


export function* apiGetPayDepositList(payload) {
  const requestUrl = urlLink.api.serverUrl + urlLink.api.getListOrderNoPayOfPayDeposit + payload.payload;
  yield put(loadRepos());
  try {
    const response = yield axios.get(requestUrl);
    console.log({response});
    yield put(getListOrderNoPaySuccess(response.data.data));
  } catch (error) {
    yield put(getListOrderNoPayFail(error.response.data));
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

// Individual exports for testing
export default function* payDepositListSaga() {
  yield takeLatest(GET_LIST_ORDER_NO_PAY_OF_PAY_DEPOSIT, apiGetPayDepositList);
}
