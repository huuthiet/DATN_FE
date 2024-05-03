// import { take, call, put, select } from 'redux-saga/effects';
import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';
import { urlLink } from '../../helper/route';
import { loadRepos, reposLoaded } from '../App/actions';
import { getJobDetailFail, getJobDetailSuccess } from './actions';
import { GET_JOB_DETAIL } from './constants';

export function* apiGetJob(payload) {
  const { id } = payload.payload;
  const requestUrl = `${urlLink.api.serverUrl + urlLink.api.job}/${id}`;
  yield put(loadRepos());
  try {
    const response = yield axios.get(requestUrl);
    yield put(getJobDetailSuccess(response.data.data));
  } catch (error) {
    yield put(getJobDetailFail(error.response.data));
  } finally {
    yield put(reposLoaded());
  }
}

// Individual exports for testing
export default function* jobDetailSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(GET_JOB_DETAIL, apiGetJob);
}
