// import { take, call, put, select } from 'redux-saga/effects';
import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { push } from 'react-router-redux';
import { POST_MOTEL } from './constants';
import { urlLink } from '../../helper/route';
import { postMotelSuccess, postMotelFail } from './actions';
import { loadRepos, reposLoaded } from '../App/actions';
// Individual exports for testing
export function* apiPostMotel(payload) {
  const requestUrl = urlLink.api.serverUrl + urlLink.api.createMotel;
  yield put(loadRepos());
  try {
    const response = yield axios.post(requestUrl, payload.payload);
    yield put(postMotelSuccess(response.data.data));
  } catch (error) {
    yield put(postMotelFail(error.response.data));
  } finally {
    yield put(reposLoaded());
  }
}
export default function* createMotelSaga() {
  yield takeLatest(POST_MOTEL, apiPostMotel);
}
