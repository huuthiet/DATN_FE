import { GET_LIST_ROOM } from './constants';
import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { urlLink } from '../../helper/route';
import { getListRoomSuccess, getListRoomFail } from './actions';
import { loadRepos, reposLoaded } from '../App/actions';

export function* apiGetRoomManager() {
  const requestUrl = urlLink.api.serverUrl + urlLink.api.getListRoom;
  yield put(loadRepos());
  try {
    const response = yield axios.get(requestUrl);
    yield put(getListRoomSuccess(response.data.data));
  } catch (error) {
    console.log(11111111);
    yield put(getListRoomFail(error.response.data));
  } finally {
    yield put(reposLoaded());
  }
}

export default function* RoomManagerSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(GET_LIST_ROOM, apiGetRoomManager);
}
