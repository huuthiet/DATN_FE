// import { take, call, put, select } from 'redux-saga/effects';

import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';
import { urlLink } from '../../helper/route';
import { loadRepos, reposLoaded } from '../App/actions';
import { getJobListUserFail, getJobListUserSuccess } from './actions';
import { GET_JOB_LIST_USER } from './constants';

// Individual exports for testing
export function* apiGetJobListUser(payload) {
  const { id } = payload;
  const requestUrl = `${urlLink.api.serverUrl +
    urlLink.api.adminJobListUser}/${id}`;
  yield put(loadRepos());
  try {
    const response = yield axios.get(requestUrl);
    yield put(getJobListUserSuccess(response.data.data));
  } catch (error) {
    yield put(getJobListUserFail(error.response.data));
  } finally {
    yield put(reposLoaded());
  }
}
export default function* jobListSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(GET_JOB_LIST_USER, apiGetJobListUser);
}
