import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';
import { urlLink } from '../../helper/route';
import { loadRepos, reposLoaded } from '../App/actions';
import {
  getHostRevenueFail,
  getHostRevenueSuccess,
  getListRoomFail,
  getListRoomSuccess,
  postWithdrawSuccess,
  postWithdrawFail,
} from './actions';
import { GET_HOST_REVENUE, GET_LIST_ROOM, POST_WITHDRAW } from './constants';

export function* apiGetListRoom(payload) {
  const { data } = payload;
  console.log('data', data);
  const revenueRequest = `${urlLink.api.serverUrl}${urlLink.api.hostBuildingListForRevenue
    }${data.id}`;
  console.log('revenueRequesttt', revenueRequest);
  try {
    const revenueResponse = yield axios.get(revenueRequest);
    console.log('revenueResponse', revenueResponse.data.data);
    yield put(getListRoomSuccess(revenueResponse.data.data));
  } catch (error) {
    yield put(getListRoomFail(error.response.data));
  }
}

export function* apiGetHostRevenue(payload) {
  const { data } = payload;
  console.log('data', data);
  const idMotel = data.selectedBuilding;
  // const month = data.selectedMonth;
  const year = data.selectedYear;
  const revenueRequest = `${urlLink.api.serverUrl}${urlLink.api.buildingRevenue
    }${idMotel}/${year}`;
  console.log('revenueRequest', revenueRequest);
  yield put(loadRepos());
  try {
    const revenueResponse = yield axios.get(revenueRequest);
    console.log('revenueResponse', revenueResponse.data.data);
    yield put(getHostRevenueSuccess(revenueResponse.data.data));
  } catch (error) {
    yield put(getHostRevenueFail(error.response.data));
  } finally {
    yield put(reposLoaded());
  }
}

export function* apiPostWithdrawRequest(payload) {
  const { data } = payload;
  console.log("Check withdraw data: ", data);

  const requestUrl = urlLink.api.serverUrl + urlLink.api.postRequestWithdrawHost;
  console.log("Check withdraw requestUrl: ", requestUrl);
  try {
    const response = yield axios.post(requestUrl, data);
    console.log('Check withdraw response: ', response);
    yield put(postWithdrawSuccess(response.data));
  } catch (error) {
    yield put(postWithdrawFail(error.response.data));
  }

}
// Individual exports for testing
export default function* TransactionLogSaga() {
  yield takeLatest(GET_LIST_ROOM, apiGetListRoom);
  yield takeLatest(GET_HOST_REVENUE, apiGetHostRevenue);
  yield takeLatest(POST_WITHDRAW, apiPostWithdrawRequest);
}
