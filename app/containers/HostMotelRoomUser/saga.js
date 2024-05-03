import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';
import { urlLink } from '../../helper/route';
import { loadRepos, reposLoaded } from '../App/actions';
import { getListRoomFailUser, getListRoomSuccessUser } from './actions';
import { GET_LIST_ROOM_USER } from './constants';

export function* apiGetListRoomUser() {
  const requestUrl = `${urlLink.api.serverUrl}${
    urlLink.api.motelListDetail
  }/owner/jobList/owner`;

  yield put(loadRepos());
  try {
    const response = yield axios.get(requestUrl);
    yield put(getListRoomSuccessUser(response.data.data.data));
  } catch (error) {
    yield put(getListRoomFailUser(error.response));
  } finally {
    yield put(reposLoaded());
  }
}
// Individual exports for testing
export default function* TransactionLogSaga() {
  yield takeLatest(GET_LIST_ROOM_USER, apiGetListRoomUser);
}
