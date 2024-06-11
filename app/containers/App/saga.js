import axios from 'axios';
import { push } from 'react-router-redux';
import { put, takeLatest } from 'redux-saga/effects';
import { urlLink } from '../../helper/route';
import { apiClearProfile } from '../Profile/saga';
import {
  Search_AddressesFail,
  Search_AddressesSuccess,
  Search_AddressesSuccessNull,
  getLogoutFail,
  getLogoutSuccess,
  loadRepos,
  reposLoaded,
  saveCurrentUser,
} from './actions';
import { LOGOUT, SEARCH_ADDRESSES } from './constants';

// import { take, call, put, select } from 'redux-saga/effects';
export function* apiLogout() {
  const requestUrl = urlLink.api.serverUrl + urlLink.api.auth.log_out;
  yield put(loadRepos());
  try {
    yield axios.put(requestUrl);
    // clear header axios
    yield (axios.defaults.headers.common.Authorization = '');
    yield put(getLogoutSuccess());
  } catch (error) {
    yield put(getLogoutFail());
  } finally {
    yield put(saveCurrentUser(''));
    // yield put(apiClearProfile());
    yield window.localStorage.clear();
    yield window.sessionStorage.clear();
    yield put(push(urlLink.home));
    yield put(reposLoaded());
  }
}
// import { take, call, put, select } from 'redux-saga/effects';

export function* apiSearchRoom(payload) {
  if (payload.value) {
    const requestUrl =
      urlLink.api.serverUrl +
      urlLink.api.searchMotelRoomfromAddress +
      payload.value;
    yield put(loadRepos());
    try {
      const response = yield axios.get(requestUrl);
      console.log("posstionnnn", response);
      yield put(Search_AddressesSuccess(response.data.data));
    } catch (error) {
      yield put(Search_AddressesFail(error.response.data));
    } finally {
      yield put(reposLoaded());
    }
  } else {
    yield put(Search_AddressesSuccessNull(null));
  }
}
// Individual exports for testing
export default function* appSaga() {
  yield takeLatest(LOGOUT, apiLogout);
  yield takeLatest(SEARCH_ADDRESSES, apiSearchRoom);
}
