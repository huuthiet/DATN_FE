import axios from 'axios';
import localStoreService from 'local-storage';
import axiosFormData from 'axios';
import FormData from 'form-data';
import { put, takeLatest } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { GET_ROOM } from '../RoomDetail/constants';

import { apiGetRoom } from '../RoomDetail/saga';
// import { take, call, put, select } from 'redux-saga/effects';
import { urlLink } from '../../helper/route';
import { loadRepos, reposLoaded } from '../App/actions';
import {
  postJobFail,
  postJobSuccess,
  getBankInfoListSuccess,
  getBankInfoListFail,
} from './actions';
import { GET_BANK_INFO, POST_JOB } from './constants';
// import { GET_ROOM } from '../RoomPage/constants';

export function* apiPostJob(payload) {
  const { formData } = payload;
  console.log('formData in saga: ', formData);

  const requestUrl = urlLink.api.serverUrl + urlLink.api.job;
  const requestUrlPayWallet = urlLink.api.serverUrl + urlLink.api.pay;
  let response_job;

  try {
    if (formData.type === "wallet") {
      console.log("Thanh toán ví nội bộ");
      console.log({formData});
      response_job = yield axios.post(requestUrl, formData);
      console.log('response_job: ', response_job);
    } else if (formData.type === "cash") {
      console.log("Thanh toán bằng tiền")
      console.log({formData});

      const urlCreateJobAndTransactions =
        urlLink.api.serverUrl +
        urlLink.api.postTransactionsDepositPendingBanking +
        formData.keyPayment;

      const response = yield axios.post(urlCreateJobAndTransactions, formData);
      console.log("response cccccre", response);

    }

    try {
      if (formData.type === 'wallet') {
        const id = response_job.data.data.currentOrder._id;
        const payloadOder = {
          orderId: id,
          type: formData.type,
        };
        const response = yield axios.put(requestUrlPayWallet, payloadOder);
        yield put(push('/profile'));
      } else {
        console.log("Đã gọiiii");
        yield put(push('/transaction-banking-cash-log'));
      }

    } catch (error) {
      yield put(postJobFail(error.response.data));
    } finally {
      yield put(reposLoaded());
    }

  } catch (error) {
    yield put(postJobFail(error.response.data));
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


export function* apiBankInfo(payload) {
  console.log("payyyy", payload);
  // const requestUrl = urlLink.api.serverUrl + urlLink.api.getBankOwnerRoom + payload.id;
  const requestUrl = urlLink.api.serverUrl + urlLink.api.getBankMasterList;
  try {
    const response = yield axios.get(requestUrl);
    if (response && response.data) {
      console.log('apiBankInfo -> responseeee', response);
      yield put(getBankInfoListSuccess(response.data.data));
    } else {
      yield put(getBankInfoListFail('Invalid response format'));
    }
  } catch (error) {
    if (error.response && error.response.data) {
      yield put(getBankInfoListFail(error.response.data));
    } else {
      yield put(getBankInfoListFail('Unknown error occurred'));
    }
  }
}

export function isEmpty(str) {
  return !str || str.length === 0;
}
// Individual exports for testing
export default function* jobSaga() {
  yield takeLatest(GET_ROOM, apiGetRoom);
  yield takeLatest(POST_JOB, apiPostJob);
  yield takeLatest(GET_BANK_INFO, apiBankInfo);
}
