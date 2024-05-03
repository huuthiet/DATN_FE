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


export function* apiGetBillWithToken() {
}

// Individual exports for testing
export default function* profileSaga() {
  yield takeLatest(GET_JOBS, apiGetBillWithToken);
}
