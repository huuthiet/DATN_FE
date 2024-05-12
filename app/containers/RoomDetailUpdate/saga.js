// import { take, call, put, select } from 'redux-saga/effects';
import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { push } from 'react-router-redux';
import { POST_MOTEL, GET_ROOM, PUT_ROOM_DETAIL_UPDATE } from './constants';
import { urlLink } from '../../helper/route';
import {
  postMotelSuccess,
  postMotelFail,
  putRoomDetailUpdateSuccess,
  putRoomDetailUpdateFail,
} from './actions';
import { loadRepos, reposLoaded } from '../App/actions';
// Individual exports for testing
export function* apiPostMotel(payload) {
  const requestUrl = urlLink.api.serverUrl + urlLink.api.roomDetail;
  yield put(loadRepos());
  try {
    const response = yield axios.post(requestUrl, payload.payload);
    yield put(postMotelSuccess(response.data.data));
  } catch (error) {
    yield put(postMotelFail(error.response.data));
  } finally {
    yield put(reposLoaded());
  }
}

export function* apiGetRoom(payload) {
  const { id } = payload;
  const requestUrl = urlLink.api.serverUrl + urlLink.api.roomDetail + id;
  yield put(loadRepos());
  try {
    const response = yield axios.get(requestUrl);
    yield put(getRoomSuccess(response.data.data));
  } catch (error) {
    yield put(getRoomFail(error.response.data));
  } finally {
    yield put(reposLoaded());
  }
}

const apiPostImg = async payload => {
  const { id, formData } = payload;
  const requestUrl = `${urlLink.api.serverUrl +
    urlLink.api.motelDetail}/img/${id}`;

  const config = {
    headers: {
      'content-type': 'multipart/form-data',
    },
  };
  try {
    const response = await axios.post(requestUrl, formData, config);
    if (response.data.data.images) {
      return response.data.data.images.imageUrl;
    }
  } catch (err) {
    console.error(err);
  }
};

export function* apiPutRoomDetailUpdate(payload) {
  const requestUrl = urlLink.api.serverUrl + urlLink.api.updateUtilities;
  let data = {};
  if (payload.payload.arrayUrlImage) {
    data = {
      id: payload.payload.id,
      utilities: payload.payload.utilities,
      name: payload.payload.name,
      idElectricMetter: payload.payload.idElectricMetter,
      electricityPrice: payload.payload.electricityPrice,
      price: payload.payload.price,
      waterPrice: payload.payload.waterPrice,
      minimumMonths: payload.payload.minimumMonths,
      availableDate: payload.payload.availableDate,
      arrayUrlImage: payload.payload.arrayUrlImage,
      arrayRemoveImg: payload.payload.arrayRemoveImg,
      acreage: payload.payload.acreage,
      roomPassword: payload.payload.roomPassword,
      depositPrice: payload.payload.depositPrice,
      wifiPrice: payload.payload.wifiPrice,
      garbagePrice: payload.payload.garbagePrice,
      vihicle: payload.payload.vihicle,
      person: payload.payload.person,
    };
  } else {
    data = {
      id: payload.payload.id,
      utilities: payload.payload.utilities,
      name: payload.payload.name,
      idElectricMetter: payload.payload.idElectricMetter,
      electricityPrice: payload.payload.electricityPrice,
      price: payload.payload.price,
      waterPrice: payload.payload.waterPrice,
      minimumMonths: payload.payload.minimumMonths,
      availableDate: payload.payload.availableDate,
      acreage: payload.payload.acreage,
      roomPassword: payload.payload.roomPassword,
      depositPrice: payload.payload.depositPrice,
      wifiPrice: payload.payload.wifiPrice,
      garbagePrice: payload.payload.garbagePrice,
      arrayRemoveImg: payload.payload.arrayRemoveImg,
      vihicle: payload.payload.vihicle,
      person: payload.payload.person,
    };
  }

  yield put(loadRepos());
  try {
    const response = yield axios.put(requestUrl, data);
    yield put(putRoomDetailUpdateSuccess(response.data.data));
    yield put(push(`/motel-detail/${response.data.data.idMotel}`));
  } catch (error) {
    yield put(putRoomDetailUpdateFail(error.response.data));
  } finally {
    yield put(reposLoaded());
  }
}

export default function* roomDetailSaga() {
  yield takeLatest(POST_MOTEL, apiPostMotel);
  yield takeLatest(GET_ROOM, apiGetRoom);
  yield takeLatest(PUT_ROOM_DETAIL_UPDATE, apiPutRoomDetailUpdate);
}
