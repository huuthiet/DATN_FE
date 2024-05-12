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

export function* apiGetRoom(payload) {
  const { id } = payload;
  const requestUrl = urlLink.api.serverUrl + urlLink.api.roomDetail + id;
  yield put(loadRepos());
  try {
    const response = yield axios.get(requestUrl);
    if (response && response.data && response.data) {
      console.log('response.data', response.data.data);
      yield put(getRoomSuccess(response.data.data));
    } else {
      yield put(getRoomFail(response.data));
    }
  } catch (error) {
    yield put(getRoomFail(error.response.data));
  } finally {
    yield put(reposLoaded());
  }
}

export function* apiDeleteRoom(payload) {
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
  yield takeLatest(GET_ROOM, apiGetRoom);
  yield takeLatest(DELETE_ROOM, apiDeleteRoom);
}
