import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { push } from 'react-router-redux';

import { notificationController } from '../../controller/notificationController';

import {
  GET_JOB,
  PUT_ACTIVE,
  PUT_DEPOSIT,
  PUT_CHECKOUT,
  PUT_JOB,
  PUT_RENEW_CONTRACT,
} from './constants';

import { GET_ROOM } from '../RoomDetail/constants';
import { apiGetRoom } from '../RoomDetail/saga';
import { urlLink } from '../../helper/route';
import {
  getJobSuccess,
  getJobFail,
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
} from './actions';
import { loadRepos, reposLoaded } from '../App/actions';
import { GET_PROFILE } from '../Profile/constants';
import { apiGetProfile } from '../Profile/saga';

export function* apiGetJob(payload) {
  const { id, idElectricMetter } = payload;
  console.log("id in saga", id);
  const currentDate = new Date();
  const formattedStartDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    2
  ).toISOString().slice(0, 10);
  const formattedCurrentDate = currentDate.toISOString().slice(0, 10);
  const requestDataUrl = urlLink.api.serverUrl + urlLink.api.getDataEnergyPerDayByTime + idElectricMetter + `/${formattedStartDate}/${formattedCurrentDate}`;

  try {
    const dataResponse = yield axios.get(requestDataUrl);
    if (dataResponse && dataResponse.data) {
      // console.log("Check getEnergyData in saga: ", dataResponse.data.data);
      yield put(getDataSuccess(dataResponse.data.data));
    } else {
      yield put(getDataFail(error.response.data));
    }
  } catch (error) {
    yield put(getDataFail(error.response.data));
  }
  const requestUrl = `${urlLink.api.serverUrl + urlLink.api.job}/${id}`;
  yield put(loadRepos());
  try {
    const response = yield axios.get(requestUrl);
    if (response && response.data) {
      console.log("Check getJob in saga: ", response.data.data);
      yield put(getJobSuccess(response.data.data));
    } else {
      yield put(getJobFail(error.response.data));
    }

  } catch (error) {
    yield put(getJobFail(error.response.data));
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
  const { id, numberMon } = payload;
  console.log({ id });
  console.log({ numberMon });
  // const requestUrl = `${urlLink.api.serverUrl + urlLink.api.job}/${id}/active`;
  const requestUrl = `http://localhost:5502/api/v1/homeKey/job/renewContract/${id}`;
  const dataUpdate = {
    numberMon: numberMon
  }
  yield put(loadRepos());
  try {
    const response = yield axios.put(requestUrl, dataUpdate);
    yield put(putRenewContractSuccess(response.data.data));
    notificationController.success(response.data.data);
    yield put(getJob(id));
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
          } catch (error) { }
        } else {
          yield put(putDepositSuccess(response.data.data));
          yield put(getJob(jobId));
          yield put(push(`/job-verify/${jobId}`));
        }
      }
      // eslint-disable-next-line no-empty
    } catch (error) { }
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
  console.log("id in saga", id);

  const requestUrlPayWallet = urlLink.api.serverUrl + urlLink.api.pay;
  const requestUrl = `${urlLink.api.serverUrl + urlLink.api.job}/${id}`;

  const response = yield axios.get(requestUrl);

  const order = response.data.data.orders;
  console.log("Check order saga: ", order);
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
  yield takeLatest(GET_PROFILE, apiGetProfile);
  yield takeLatest(PUT_ACTIVE, apiPutActive);
  yield takeLatest(PUT_RENEW_CONTRACT, apiPutRenewContract);
  yield takeLatest(PUT_DEPOSIT, apiPutDeposit);
  yield takeLatest(PUT_CHECKOUT, apiPutCheckOut);
  yield takeLatest(PUT_JOB, apiPutJob);
  // yield takeLatest(GET_ROOM, apiGetRoom);
}
