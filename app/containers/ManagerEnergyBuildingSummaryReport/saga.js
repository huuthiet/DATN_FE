import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { GET_MOTEL_LIST } from './constants';
import { urlLink } from '../../helper/route';
import { getMotelListSuccess, getMotelListFail } from './actions';
import { loadRepos, reposLoaded } from '../App/actions';

export function* apiGetMotelList() {
  const requestUrl = urlLink.api.serverUrl + urlLink.api.getRoomList;
  yield put(loadRepos());
  try {
    const response = yield axios.get(requestUrl);
    yield put(getMotelListSuccess(response.data.data.data));
  } catch (error) {
    yield put(getMotelListFail(error.response.data));
  } finally {
    yield put(reposLoaded());
  }
}

// Individual exports for testing
export default function* profileSaga() {
  yield takeLatest(GET_MOTEL_LIST, apiGetMotelList);
}
