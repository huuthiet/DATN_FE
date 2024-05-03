import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';
import { urlLink } from '../../helper/route';
import { loadRepos, reposLoaded } from '../App/actions';
import { getListRoomFail, getListRoomSuccess } from './actions';
import { GET_LIST_ROOM } from './constants';

export function* apiGetListRoom(payload) {
  const { data } = payload;
  const requestUrl = `${urlLink.api.serverUrl}${urlLink.api.motelListDetail}/${
    data.id
  }/jobList/MotelRoom`;
  yield put(loadRepos());
  try {
    const response = yield axios.get(requestUrl, {
      params: data,
    });
    yield put(getListRoomSuccess(response.data.data.data));
  } catch (error) {
    yield put(getListRoomFail(error.response.data));
  } finally {
    yield put(reposLoaded());
  }
}
// Individual exports for testing
export default function* TransactionLogSaga() {
  yield takeLatest(GET_LIST_ROOM, apiGetListRoom);
}
