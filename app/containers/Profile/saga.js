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
  deleteMotelSuccess,
  deleteMotelFail,
  getMotelListSuccess,
  getMotelListFail,
  getMotelList,
  getJobsSuccess,
  getJobsFail,
  deleteJobSuccess,
  deleteJobFail,
  getJobs,
  getProfileSuccess,
  getProfileFail,
  clearProfile,
  clearProfileSuccess,
  clearProfileFail,
} from './actions';
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
export function* apiGetJobs() {
  const requestUrl = urlLink.api.serverUrl + urlLink.api.jobs;
  yield put(loadRepos());
  try {
    const response = yield axios.get(requestUrl);
    if (response && response.data) {
      console.log('haha check', response.data.data);
      yield put(getJobsSuccess(response.data.data));
    } else {
      yield put(getJobsFail(error.response.data));
    }
  } catch (error) {
    yield put(getJobsFail(error.response.data));
  } finally {
    yield put(reposLoaded());
  }
}

export function* apiDeleteMotel(payload) {
  const requestUrl = `${urlLink.api.serverUrl + urlLink.api.motelDetail}/${payload.id
    }`;
  yield put(loadRepos());
  try {
    const response = yield axios.delete(requestUrl);
    yield put(deleteMotelSuccess(response.data.data));
    yield put(getMotelList());
  } catch (error) {
    yield put(deleteMotelFail(error.response.data));
  } finally {
    yield put(reposLoaded());
  }
}

export function* apiDeleteJob(payload) {
  const { id = '' } = payload;
  const requestUrl = `${urlLink.api.serverUrl + urlLink.api.job}/${id}`;
  yield put(loadRepos());
  try {
    const response = yield axios.delete(requestUrl);
    yield put(deleteJobSuccess(response.data.data));
    yield put(getJobs());
  } catch (error) {
    yield put(deleteJobFail(error.response.data));
  } finally {
    yield put(reposLoaded());
  }
}
export function* apiGetProfile() {
  const requestUrl = urlLink.api.serverUrl + urlLink.api.profile;
  yield put(loadRepos());
  try {
    const response = yield axios.get(requestUrl);
    yield put(getProfileSuccess(response.data.data));
  } catch (error) {
    yield put(getProfileFail(error.response.data));
  } finally {
    yield put(reposLoaded());
  }
}

export function* apiClearProfile() {
  try {
    console.log('hello');
    yield put(clearProfileSuccess());
  } catch (error) {
    yield put(clearProfileFail());
  }
}

// Individual exports for testing
export default function* profileSaga() {
  yield takeLatest(GET_MOTEL_LIST, apiGetMotelList);
  yield takeLatest(DELETE_MOTEL, apiDeleteMotel);
  yield takeLatest(GET_JOBS, apiGetJobs);
  yield takeLatest(DELETE_JOB, apiDeleteJob);
  yield takeLatest(GET_PROFILE, apiGetProfile);
}
