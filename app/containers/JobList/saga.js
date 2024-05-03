// import { take, call, put, select } from 'redux-saga/effects';

import { GET_JOB_LIST } from './constants';
import { getJobListSuccess, getJobListFail } from './actions';
import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { urlLink } from '../../helper/route';
import { loadRepos, reposLoaded } from '../App/actions';

// Individual exports for testing
export function* apiGetJobList() {
  const requestUrl = urlLink.api.serverUrl + urlLink.api.adminJobList;
  yield put(loadRepos());
  try {
    const response = yield axios.get(requestUrl);
    yield put(getJobListSuccess(response.data.data));
  } catch (error) {
    yield put(getJobListFail(error.response.data));
  } finally {
    yield put(reposLoaded());
  }
}
export default function* jobListSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(GET_JOB_LIST, apiGetJobList);
}
