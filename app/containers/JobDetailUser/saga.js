import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { push } from 'react-router-redux';
import { toast } from 'react-toastify';

import { notificationController } from '../../controller/notificationController';

import {
  GET_JOB,
  PUT_ACTIVE,
  PUT_DEPOSIT,
  PUT_CHECKOUT,
  PUT_JOB,
  PUT_RENEW_CONTRACT,
  GET_BANK_INFO,
  POST_TRANSACTION
} from './constants';

import { urlLink } from '../../helper/route';
import {
  getJobSuccess,
  getJobFail,
  postTransactionSuccess,
  postTransactionFail,
  getDataSuccess,
  getDataFail,
  putActiveSuccess,
  putDepositSuccess,
  putDepositFail,
  putActiveFail,
  putRenewContractSuccess,
  putRenewContractFail,
  getJob,
  putCheckOutSuccess,
  putCheckOutFail,
  putJobFail,
  getBankInfoSuccess,
  getBankInfoFail,
} from './actions';
import { loadRepos, reposLoaded } from '../App/actions';
import { GET_PROFILE } from '../Profile/constants';
import { apiGetProfile } from '../Profile/saga';
import { func } from 'prop-types';

export function* apiGetJob(payload) {
  console.log("XXXXXXXXXXXXXXXXXXXX")
  const { id, idRoom } = payload;
  console.log('id in saga', id);
  // const currentDate = new Date();
  // const formattedStartDate = new Date(
  //   currentDate.getFullYear(),
  //   currentDate.getMonth(),
  //   2,
  // )
  //   .toISOString()
  //   .slice(0, 10);

    
  // const formattedCurrentDate = currentDate.toISOString().slice(0, 10);
  // console.log({formattedStartDate})
  // console.log({formattedCurrentDate})
  // const requestDataUrl = `${urlLink.api.serverUrl +
  //   urlLink.api.getTotalKWhPerDayForDayToDayV2 +
  //   idRoom}/${formattedStartDate}/${formattedCurrentDate}`;
  // try {
  //   const dataResponse = yield axios.get(requestDataUrl);
  //   if (dataResponse && dataResponse.data) {
  //     // console.log("Check getEnergyData in saga: ", dataResponse.data.data);
  //     yield put(getDataSuccess(dataResponse.data.data));
  //   } else {
  //     yield put(getDataFail(error.response.data));
  //   }
  // } catch (error) {
  //   yield put(getDataFail(error.response.data));
  // }
  const requestUrl = `${urlLink.api.serverUrl + urlLink.api.job}/${id}`;
  yield put(loadRepos());
  try {
    const response = yield axios.get(requestUrl);
    if (response && response.data) {
      console.log('Check getJob in saga: ', response.data.data);
      yield put(getJobSuccess(response.data.data));
    } else {
      yield put(getJobFail(error.response.data));
    }
  } catch (error) {
    yield put(getJobFail(error.response.data));
  } finally {
    yield put(reposLoaded());
  }

  // const requestBank = urlLink.api.serverUrl + urlLink.api.getBankOwnerRoom + idRoom;
  const requestBank = urlLink.api.serverUrl + urlLink.api.getBankMasterList;
  try {
    const response = yield axios.get(requestBank);
    console.log("responseXXX", response);
    if (response && response.data) {
      console.log('apiBankInfo -> responseeee', response);
      yield put(getBankInfoSuccess(response.data.data));
    } else {
      yield put(getBankInfoFail('Invalid response format'));
    }
  } catch (error) {
    if (error.response && error.response.data) {
      yield put(getBankInfoFail(error.response.data));
    } else {
      yield put(getBankInfoFail('Unknown error occurred'));
    }
  }
}

export function* apiGetBankInfo(payload) {
  console.log("payyyySSSSSSSSSSSSSSS", payload);
  const requestUrl = urlLink.api.serverUrl + urlLink.api.getBankOwnerRoom + payload.id;
  try {
    const response = yield axios.get(requestUrl);
    if (response && response.data) {
      console.log('apiBankInfo -> responseeee', response);
      yield put(getBankInfoSuccess(response.data.data));
    } else {
      yield put(getBankInfoFail('Invalid response format'));
    }
  } catch (error) {
    if (error.response && error.response.data) {
      yield put(getBankInfoFail(error.response.data));
    } else {
      yield put(getBankInfoFail('Unknown error occurred'));
    }
  }
}

export function* apiPostTransaction(payload) {
  const formData = payload.payload;
  const requestUrl = `${urlLink.api.serverUrl + urlLink.api.postTransactionAfterCheckInCostPendingBanking}`;
  yield put(loadRepos());
  try {
    const response = yield axios.post(requestUrl, formData);
    yield put(postTransactionSuccess(response.data.data));
    // yield put(getJob(formData.job, formData.room));
    yield put(push("/transaction-banking-cash-log"));
  } catch (error) {
    yield put(postTransactionFail(error.response.data));
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
    yield put(push("/transaction-banking-cash-log"));
  } finally {
    yield put(reposLoaded());
  }
}

export function* apiPutActive(payload) {
  const { id } = payload;
  const requestUrl = `${urlLink.api.serverUrl + urlLink.api.job}/${id}/active`;
  yield put(loadRepos());
  try {
    const response = yield axios.put(requestUrl);
    yield put(putActiveSuccess(response.data.data));
    yield put(getJob(id));
  } catch (error) {
    yield put(putActiveFail(error.response.data));
  } finally {
    yield put(reposLoaded());
  }
}
function isEmpty(str) {
  return !str || str.length === 0;
}

export function* apiPutRenewContract(payload) {
  const { id, numberMon, idRoom } = payload;
  console.log({ id });
  console.log({ numberMon });
  // const requestUrl = `${urlLink.api.serverUrl + urlLink.api.job}/${id}/active`;
  // const requestUrl = `http://localhost:5502/api/v1/homeKey/job/renewContract/${id}`;
  const requestUrl = `${urlLink.api.serverUrl + urlLink.api.renewContract}${id}`;
  const dataUpdate = {
    numberMon,
  };
  yield put(loadRepos());
  try {
    const response = yield axios.put(requestUrl, dataUpdate);
    yield put(putRenewContractSuccess(response.data.data));
    notificationController.success(response.data.data);
    yield put(getJob(id, idRoom));
  } catch (error) {
    yield put(putRenewContractFail(error.response.data));
    notificationController.error(error.response.data.errors[0].errorMessage);
    // console.log("error", error.response.data.errors[0].errorMessage);
  } finally {
    yield put(reposLoaded());
  }
}

export function* apiPutDeposit(payload) {
  const { jobId, orderId } = payload.payload;
  const requestUrlPayWallet = urlLink.api.serverUrl + urlLink.api.pay;
  yield put(loadRepos());
  try {
    const response = yield axios.put(requestUrlPayWallet, { orderId });
    try {
      const requestUrlProfile = urlLink.api.serverUrl + urlLink.api.profile;
      const responseProfile = yield axios.get(requestUrlProfile);
      if (responseProfile.data.data) {
        const profile = responseProfile.data.data;
        // eslint-disable-next-line eqeqeq
        if (!isEmpty(profile.backId) && !isEmpty(profile.frontId)) {
          // have NID- update NID to jobModel
          try {
            const requestUrlUpdateModel = `${urlLink.api.serverUrl +
              urlLink.api.job}/${response.data.data.job}/images/profile`;
            yield axios.put(requestUrlUpdateModel, null);
            yield put(putDepositSuccess(response.data.data));
            yield put(getJob(jobId));
            // eslint-disable-next-line no-empty
          } catch (error) {}
        } else {
          yield put(putDepositSuccess(response.data.data));
          yield put(getJob(jobId));
          yield put(push(`/job-verify/${jobId}`));
        }
      }
      // eslint-disable-next-line no-empty
    } catch (error) {}
  } catch (error) {
    yield put(putDepositFail(error.response.data));
  } finally {
    yield put(reposLoaded());
  }
}

export function* apiPutCheckOut(payload) {
  const { id, returnRoomDate } = payload;
  const requestUrl = `${urlLink.api.serverUrl +
    urlLink.api.job}/${id}/updateReturnRoomDate`;
  yield put(loadRepos());
  try {
    const response = yield axios.put(requestUrl, {
      returnRoomDate,
    });
    yield put(putCheckOutSuccess(response.data.data));
    yield put(getJob(id));
  } catch (error) {
    yield put(putCheckOutFail(error.response.data));
  } finally {
    yield put(reposLoaded());
  }
}

export function* apiPutJob(payload) {
  const { id } = payload;
  // console.log('id in saga', id);

  const requestUrlPayWallet = urlLink.api.serverUrl + urlLink.api.pay;
  const requestUrl = `${urlLink.api.serverUrl + urlLink.api.job}/${id}`;

  const response = yield axios.get(requestUrl);

  const order = response.data.data.orders;
  console.log('Check order saga: ', order);
  let orderId = null;
  for (let i = 0; i < order.length; i++) {
    if (order[i].paymentMethod === 'none') {
      orderId = order[i]._id;
    }
  }
  yield put(loadRepos());
  try {
    const responseOrder = yield axios.put(requestUrlPayWallet, {
      orderId,
    });
    console.log({ responseOrder });
    yield put(getJob(id));
    yield put(reposLoaded());
  } catch (error) {
    yield put(putJobFail(error.response.data.errors[0]));
  } finally {
    yield put(reposLoaded());
  }
}


export default function* jobDetailSaga() {
  yield takeLatest(GET_JOB, apiGetJob);
  // yield takeLatest(GET_BANK_INFO, apiGetBankInfo);
  yield takeLatest(GET_PROFILE, apiGetProfile);
  yield takeLatest(PUT_ACTIVE, apiPutActive);
  yield takeLatest(PUT_RENEW_CONTRACT, apiPutRenewContract);
  yield takeLatest(PUT_DEPOSIT, apiPutDeposit);
  yield takeLatest(PUT_CHECKOUT, apiPutCheckOut);
  yield takeLatest(PUT_JOB, apiPutJob);
  yield takeLatest(POST_TRANSACTION, apiPostTransaction);
}
