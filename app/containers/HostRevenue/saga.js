import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';
import { urlLink } from '../../helper/route';
import { loadRepos, reposLoaded } from '../App/actions';
import { getHostRevenueFail, getHostRevenueSuccess, getListRoomFail, getListRoomSuccess } from './actions';
import { GET_HOST_REVENUE, GET_LIST_ROOM } from './constants';

export function* apiGetListRoom(payload) {
  const { data } = payload;
  const revenueRequest = `${urlLink.api.serverUrl}${urlLink.api.hostBuildingListForRenenue
    }${data.id}`;
  console.log('revenueRequest', revenueRequest);
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
  try {
    const revenueResponse = yield axios.get(revenueRequest);
    console.log('revenueResponse', revenueResponse.data.data);
    yield put(getHostRevenueSuccess(revenueResponse.data.data));
  } catch (error) {
    yield put(getHostRevenueFail(error.response.data));
  }
}
// Individual exports for testing
export default function* TransactionLogSaga() {
  yield takeLatest(GET_LIST_ROOM, apiGetListRoom);
  yield takeLatest(GET_HOST_REVENUE, apiGetHostRevenue);
}
