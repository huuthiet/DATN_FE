import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import {
  GET_MOTEL_LIST,
} from './constants';
import { urlLink } from '../../helper/route';
import {
  getMotelListSuccess,
  getMotelListFail,
} from './actions';
import { loadRepos, reposLoaded } from '../App/actions';

export function* apiGetMotelList(payload) {
  const { id } = payload;

  console.log("id payload", id);

  const requestUrl = urlLink.api.serverUrl + urlLink.api.getListMotelByHost + id;
  yield put(loadRepos());
  try {
    const response = yield axios.get(requestUrl);
    // console.log("response in saga", response);
    if (response.data === null) {
      console.log("error is here");
      yield put(getMotelListSuccess([]));
    } else {
      console.log("response in saga: ", response.data);
      yield put(getMotelListSuccess(response.data));
    }
  } catch (error) {
    console.log("error in saga", error);
    yield put(getMotelListFail(error.response.data));
  } finally {
    yield put(reposLoaded());
  }
}

// Individual exports for testing
export default function* profileSaga() {
  yield takeLatest(GET_MOTEL_LIST, apiGetMotelList);
}
