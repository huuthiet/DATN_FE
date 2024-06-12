import { put, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import axios from 'axios';
import {
  GET_PAY_DEPOSIT_LIST,
} from './constants';
import { urlLink } from '../../helper/route';
import {
  getPayDepositListSuccess,
  getPayDepositListFail,
  getPayDepositList,
} from './actions';
import { loadRepos, reposLoaded } from '../App/actions';


export function* apiGetPayDepositList() {
  const requestUrl = urlLink.api.serverUrl + urlLink.api.getPayDepositListUser;
  // payload = payload;
  // console.log("xxx", payload.payload);
  yield put(loadRepos());
  try {
    const response = yield axios.get(requestUrl);
    console.log({response});
    yield put(getPayDepositListSuccess(response.data.data));
  } catch (error) {
    yield put(getPayDepositListFail(error.response.data));
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
  yield takeLatest(GET_PAY_DEPOSIT_LIST, apiGetPayDepositList);
}
