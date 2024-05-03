import { put, takeLatest } from 'redux-saga/effects';
import { GET_LIST_ROOM } from './constants';
import { urlLink } from '../../helper/route';
import { getListRoomSuccess, getListRoomFail } from './actions';
import axios from 'axios';
import { loadRepos, reposLoaded } from '../App/actions';

// Individual exports for testing
export function* apiGetListRoom() {
    const requestUrl = urlLink.api.serverUrl + urlLink.api.motelList;
    yield put(loadRepos());
    try {
        const response = yield axios.get(requestUrl);
        yield put(getListRoomSuccess(response.data.data.data));
    } catch (error) {
        yield put(getListRoomFail(error.response.data));
    } finally {
        yield put(reposLoaded());
    }
}

export default function* mapsPageSaga() {
    yield takeLatest(GET_LIST_ROOM, apiGetListRoom);
}