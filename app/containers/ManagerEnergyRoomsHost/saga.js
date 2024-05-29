import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { GET_MOTEL_INFOR } from './constants';
import { urlLink } from '../../helper/route';
import {
  getMotelInforSuccess,
  getMotelInforFail,
} from './actions';
import { loadRepos, reposLoaded } from '../App/actions';

export function* apiGetMotelInfor(payload) {
  const { id } = payload;
  // const requestUrl = urlLink.api.serverUrl + urlLink.api.motelDetail + id;
  const requestUrl = urlLink.api.serverUrl + urlLink.api.roomOfMotel + id;
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

export default function* motelListRoomSaga() {
  yield takeLatest(GET_MOTEL_INFOR, apiGetMotelInfor);
}
