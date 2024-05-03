import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';
import { urlLink } from '../../helper/route';
import { loadRepos, reposLoaded } from '../App/actions';
import {
  getListRoomFailUser,
  getListRoomSuccessUser,
  postExportBillFail,
  postExportBillSuccess,
} from './actions';
import { GET_LIST_ROOM_USER, POST_EXPORT_BILL_USER } from './constants';

export function* apiGetListRoomUser(payload) {
  const { id, idroom, idUser } = payload.payload;
  const requestUrl = `${urlLink.api.serverUrl +
    urlLink.api.motelDetail +
    id}/room/${idroom}/user/${idUser}`;
  yield put(loadRepos());
  try {
    const response = yield axios.get(requestUrl);
    yield put(getListRoomSuccessUser(response.data.data));
  } catch (error) {
    yield put(getListRoomFailUser(error.response.data));
  } finally {
    yield put(reposLoaded());
  }
}

export function* apiPostExportBill(payload) {
  const requestUrl = urlLink.api.serverUrl + urlLink.api.motelPdf;
  yield put(loadRepos());
  try {
    const response = yield axios.post(requestUrl, payload, {
      responseType: 'blob',
    });
    yield put(postExportBillSuccess(response));
  } catch (error) {
    yield put(postExportBillFail(error.response.data));
  } finally {
    yield put(reposLoaded());
  }
}
// Individual exports for testing
export default function* RoomBillSaga() {
  yield takeLatest(GET_LIST_ROOM_USER, apiGetListRoomUser);
  yield takeLatest(POST_EXPORT_BILL_USER, apiPostExportBill);
}
