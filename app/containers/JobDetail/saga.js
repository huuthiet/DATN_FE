// import { take, call, put, select } from 'redux-saga/effects';
import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { urlLink } from '../../helper/route';
import { GET_JOB_DETAIL, DELETE_JOB_DETAIL } from './constants';
import { push } from 'react-router-redux';
import {
  getJobDetailSuccess,
  getJobDetailFail,
  deleteJobDetailSuccess,
  deleteJobDetailFail,
} from './actions';
import { loadRepos, reposLoaded } from '../App/actions';

export function* apiGetJobDetail(payload) {
  const { id } = payload;
  const requestUrl = urlLink.api.serverUrl + urlLink.api.adminJobDetail + id;
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

export function* apiDeteteJobDetail(payload) {
  const { id } = payload;
  const requestUrl = urlLink.api.serverUrl + urlLink.api.adminJobDetail + id;
  yield put(loadRepos());
  try {
    const response = yield axios.delete(requestUrl);
    yield put(deleteJobDetailSuccess(response.data.data));
    yield put(push(urlLink.api.adminJobListView));
    yield put(getAdminUsers());
  } catch (error) {
    yield put(deleteJobDetailFail(error.response.data));
  } finally {
    yield put(reposLoaded());
  }
}
// Individual exports for testing
export default function* jobDetailSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(GET_JOB_DETAIL, apiGetJobDetail);
  yield takeLatest(DELETE_JOB_DETAIL, apiDeteteJobDetail);
}
