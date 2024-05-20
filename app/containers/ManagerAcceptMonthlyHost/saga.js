import { put, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import axios from 'axios';
import {
  GET_PAY_DEPOSIT_LIST,
  PUT_PAY_DEPOSIT_LIST,
} from './constants';
import { urlLink } from '../../helper/route';
import {
  getPayDepositListSuccess,
  getPayDepositListFail,
  getPayDepositList,
  approvePendingPayDeposit,
  approvePendingPayDepositSuccess,
  approvePendingPayDepositFail,
} from './actions';
import { loadRepos, reposLoaded } from '../App/actions';

export function* apiGetPayDepositList(payload) {
  const requestUrl =
  urlLink.api.serverUrl 
  + urlLink.api.getBankingCashPendingMonthlyByMotel 
  + payload.payload;
  yield put(loadRepos());
  try {
    const response = yield axios.get(requestUrl);

    console.log({response})
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

export function* apiPutPendingPayDepositApprove(payload) {
  const requestUrl =
  urlLink.api.serverUrl 
  + urlLink.api.putBankingCashPendingTransactionByMotel
  + payload.idTransaction;
  console.log("payload.idTransaction", payload)

  console.log({requestUrl});
  yield put(loadRepos());
  try {
    const response = yield axios.put(requestUrl, payload);

    console.log({response});
    yield put(approvePendingPayDepositSuccess(response.data));

    // if(response.data.data) {
    //   if(response.data.data.status === "success") {
    //     try {
    //       const requestUrlPayWallet = urlLink.api.serverUrl + urlLink.api.pay;
    //       const idOrder = response.data.data.order;
    //       const type = response.data.data.type;
    //       const payloadOder = {
    //         orderId: idOrder,
    //         type: formData.type,
    //       };
  
    //       const responsePut = yield axios.put(requestUrlPayWallet, payloadOder);
  
    //       yield put(approvePendingPayDepositSuccess(response.data));
    //     } catch (error) {
    //       yield put(approvePendingPayDepositFail(error));
    //       toast.error(
    //         error.response.data.errors[0].errorMessage,
    //         {
    //           position: toast.POSITION.TOP_RIGHT,
    //           autoClose: 3000,
    //           hideProgressBar: false,
    //           pauseOnHover: true,
    //           draggable: true,
    //         },
    //       );
    //     } finally {
    //       yield put(reposLoaded());
    //     }
    //   }
    // }
    // yield put(apiGetPayDepositList());
  } catch (error) {
    yield put(approvePendingPayDepositFail(error));
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
  yield takeLatest(
    PUT_PAY_DEPOSIT_LIST,
    apiPutPendingPayDepositApprove,
  );
}
