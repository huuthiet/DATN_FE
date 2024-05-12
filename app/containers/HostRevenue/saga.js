import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';
import { urlLink } from '../../helper/route';
import { loadRepos, reposLoaded } from '../App/actions';
import { getListRoomFail, getListRoomSuccess } from './actions';
import { GET_LIST_ROOM } from './constants';

export function* apiGetListRoom(payload) {
  const { data } = payload;
  const dateNow = new Date();
  const beforeNow = dateNow.setDate(dateNow.getDate() - 1);
  const startDate = new Date(beforeNow);
  const endDate = new Date();

  // Chuyển đổi startDate thành chuỗi ngày theo định dạng "YYYY-MM-DD"
  const startDateFormatted = startDate.toISOString().split('T')[0];

  // Chuyển đổi endDate thành chuỗi ngày theo định dạng "YYYY-MM-DD"
  const endDateFormatted = endDate.toISOString().split('T')[0];

  console.log("startDateFormatted:", startDateFormatted);
  console.log("endDateFormatted:", endDateFormatted);
  console.log('data', data);
  // const requestUrl = `${urlLink.api.serverUrl}${urlLink.api.motelListDetail
  //   }/jobList/MotelRoom/owner`;
  const revenueRequest = `${urlLink.api.serverUrl}${urlLink.api.buildingRevenue}${data.id}/${startDateFormatted}/${endDateFormatted}`;
  console.log('revenueRequest', revenueRequest);
  try {
    const revenueResponse = yield axios.get(revenueRequest);
    console.log('revenueResponse', revenueResponse.data.data);
    yield put(getListRoomSuccess(revenueResponse.data.data));
  } catch (error) {
    yield put(getListRoomFail(error.response.data));
  }
  // yield put(loadRepos());
  // try {
  //   const response = yield axios.get(requestUrl, {
  //     params: data,
  //   });
  //   yield put(getListRoomSuccess(response.data.data.data));
  // } catch (error) {
  //   yield put(getListRoomFail(error.response.data));
  // } finally {
  //   yield put(reposLoaded());
  // }
}
// Individual exports for testing
export default function* TransactionLogSaga() {
  yield takeLatest(GET_LIST_ROOM, apiGetListRoom);
}
