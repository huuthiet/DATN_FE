import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';
import { urlLink } from '../../helper/route';
import { loadRepos, reposLoaded } from '../App/actions';
import { getGetMotelRoomFail, getGetMotelRoomSucces } from './actions';
import { GET_MOTEL_ROOM } from './constants';

export function* apiGetMotelRoom() {
  const requestUrl = urlLink.api.serverUrl + urlLink.api.getRoomListAdmin;
  yield put(loadRepos());
  try {
    const response = yield axios.get(requestUrl);
    yield put(getGetMotelRoomSucces(response.data.data));
  } catch (error) {
    yield put(getGetMotelRoomFail(error.response.data));
  } finally {
    yield put(reposLoaded());
  }
}
// Individual exports for testing
export default function* TransactionLogSaga() {
  yield takeLatest(GET_MOTEL_ROOM, apiGetMotelRoom);
}
