import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { GET_ROOM } from '../RoomDetail/constants';
import { apiGetRoom } from '../RoomDetail/saga';
import { PUT_EDIT_ROOM, DELETE_ROOM } from './constants';
import { urlLink } from '../../helper/route';
import {
  putEditRoomSuccess,
  putEditRoomFail,
  deleteRoomSuccess,
  deleteRoomFail,
} from './actions';
import { loadRepos, reposLoaded } from '../App/actions';
import { getRoom } from '../RoomDetail/actions';

// import { take, call, put, select } from 'redux-saga/effects';
export function* apiPutEditRoom(payload) {
  const { formData = {}, id } = payload;
  console.log('formData', formData);
  const requestUrl = urlLink.api.serverUrl + urlLink.api.roomDetail + id;
  yield put(loadRepos());
  try {
    const response = yield axios.put(requestUrl, formData);
    yield put(putEditRoomSuccess(response.data.data));
    yield put(getRoom(id));
  } catch (error) {
    yield put(putEditRoomFail(error.response.data));
  } finally {
    yield put(reposLoaded());
  }
}

export function* apiDeleteRoom(payload) {
  const { id = '' } = payload;
  const requestUrl = urlLink.api.serverUrl + urlLink.api.roomDetail + id;
  yield put(loadRepos());
  try {
    const response = yield axios.delete(requestUrl);
    yield put(deleteRoomSuccess(response.data.data));
    yield put(getRoom(id));
  } catch (error) {
    yield put(deleteRoomFail(error.response.data));
  } finally {
    yield put(reposLoaded());
  }
}
// Individual exports for testing
export default function* updateRoomSaga() {
  yield takeLatest(GET_ROOM, apiGetRoom);
  yield takeLatest(PUT_EDIT_ROOM, apiPutEditRoom);
  yield takeLatest(DELETE_ROOM, apiDeleteRoom);
}
