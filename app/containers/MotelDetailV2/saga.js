// import { GET_MOTEL } from "../Motel/constants";

// import { apiGetMotel } from "../Motel/saga";
import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { urlLink } from '../../helper/route';
import {
  getMotelDetailSuccess,
  getMotelDetailFail,
} from './actions';
import { GET_MOTEL_DETAIL } from "./constants";
import { loadRepos, reposLoaded } from '../App/actions';

export function* apiGetMotel(payload) {
  const { id } = payload;
  // const requestUrl = urlLink.api.serverUrl + urlLink.api.motelDetail + id;
  const requestUrl = urlLink.api.serverUrl + urlLink.api.motelDetailV2 + id;
  yield put(loadRepos());
  try {
    const response = yield axios.get(requestUrl);

    yield put(getMotelDetailSuccess(response.data.data));
    // if (response && response.data && response.data.data) {
    //   yield put(getMotelDetailSuccess(response.data.data));

    // } else {
    //   yield put(getMotelDetailFail('error'));
    // }
  } catch (error) {
    yield put(getMotelDetailFail(error.response.data));
  } finally {
    yield put(reposLoaded());
  }
}
// Individual exports for testing
export default function* motelDetailSaga() {
  yield takeLatest(GET_MOTEL_DETAIL, apiGetMotel);
}
