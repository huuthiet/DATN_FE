import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import {
  DELETE_MOTEL,
  GET_MOTEL_LIST,
  GET_JOBS,
  DELETE_JOB,
  GET_PROFILE,
} from './constants';
import { urlLink } from '../../helper/route';
import {
  getJobsSuccess,
  getJobsFail,
  getJobs,
} from './actions';
import { loadRepos, reposLoaded } from '../App/actions';

export function* apiGetJobs() {
  const requestUrl = urlLink.api.serverUrl + urlLink.api.jobs;
  yield put(loadRepos());
  try {
    const response = yield axios.get(requestUrl);
    yield put(getJobsSuccess(response.data.data));
  } catch (error) {
    yield put(getJobsFail(error.response.data));
  } finally {
    yield put(reposLoaded());
  }
}

// Individual exports for testing
export default function* profileSaga() {
  yield takeLatest(GET_JOBS, apiGetJobs);
}
