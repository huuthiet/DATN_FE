import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { GET_MOTEL, GET_MOTEL_INFOR, POST_FLOOR } from './constants';
import { urlLink } from '../../helper/route';
import {
  getMotelSuccess,
  getMotelFail,
  getMotelInforSuccess,
  getMotelInforFail,
  postFloorSuccess,
  postFloorFail,
  getMotel,
} from './actions';
import { loadRepos, reposLoaded } from '../App/actions';

export function* apiGetMotel(payload) {
  const { id } = payload;
  const requestUrl = urlLink.api.serverUrl + urlLink.api.motelDetail + id;
  // const requestUrl = urlLink.api.serverUrl + urlLink.api.motelDetailV2 + id;
  yield put(loadRepos());
  try {
    const response = yield axios.get(requestUrl);
    if (response && response.data && response.data.data) {
      yield put(getMotelSuccess(response.data.data));

    } else {
      yield put(getMotelFail('error'));
    }
  } catch (error) {
    yield put(getMotelFail(error.response.data));
  } finally {
    yield put(reposLoaded());
  }
}

export function* apiGetMotelInfor(payload) {
  const { id } = payload;
  // const requestUrl = urlLink.api.serverUrl + urlLink.api.motelDetail + id;
  const requestUrl = urlLink.api.serverUrl + urlLink.api.motelDetailV2 + id;
  yield put(loadRepos());
  try {
    const response = yield axios.get(requestUrl);
    if (response && response.data && response.data.data) {
      yield put(getMotelInforSuccess(response.data.data));

    } else {
      yield put(getMotelInforFail('error'));
    }
  } catch (error) {
    yield put(getMotelInforFail(error.response.data));
  } finally {
    yield put(reposLoaded());
  }
}

export function* apiPostFloor(payload) {
  const { id, formData } = payload;
  const requestUrl = urlLink.api.serverUrl + urlLink.api.createFloor;
  yield put(loadRepos());
  try {
    const response = yield axios.post(requestUrl, formData);
    yield put(postFloorSuccess(response.data.data));
    yield put(getMotel(id));
  } catch (error) {
    yield put(postFloorFail(error.response.data));
  } finally {
    yield put(reposLoaded());
  }
}

export default function* motelSaga() {
  yield takeLatest(GET_MOTEL, apiGetMotel);
  yield takeLatest(GET_MOTEL_INFOR, apiGetMotelInfor);
  yield takeLatest(POST_FLOOR, apiPostFloor);
}
