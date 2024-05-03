import axios from 'axios';
import { push } from 'react-router-redux';
import { put, takeLatest } from 'redux-saga/effects';
import { urlLink } from '../../helper/route';
import { loadRepos, reposLoaded } from '../App/actions';
import {
  deleteRoomFail,
  deleteRoomSuccess,
  getRoomFail,
  getRoomSuccess,
} from './actions';
import { DELETE_ROOM, GET_ROOM } from './constants';

export function* apiGeRoom(payload) {
  const { id } = payload;
  const requestUrl = urlLink.api.serverUrl + urlLink.api.roomDetail + id;
  yield put(loadRepos());
  try {
    const response = yield axios.get(requestUrl);
    yield put(getRoomSuccess(response.data.data));
  } catch (error) {
    yield put(getRoomFail(error.response.data));
  } finally {
    yield put(reposLoaded());
  }
}

export function* apiDeteleRoom(payload) {
  const { id } = payload;
  const requestUrl = urlLink.api.serverUrl + urlLink.api.roomDetail + id;
  yield put(loadRepos());
  try {
    const response = yield axios.delete(requestUrl, id);
    yield put(deleteRoomSuccess(response.data.data));
    yield put(push(`/motel-detail/${response.data.data._id}`));
  } catch (error) {
    yield put(deleteRoomFail(error.response.data));
  } finally {
    yield put(reposLoaded());
  }
}

export default function* roomDetailSaga() {
  yield takeLatest(GET_ROOM, apiGeRoom);
  yield takeLatest(DELETE_ROOM, apiDeteleRoom);
}
