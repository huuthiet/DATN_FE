// import { take, call, put, select } from 'redux-saga/effects';
import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { push } from 'react-router-redux';
import { PUT_CREATE_ROOM } from './constants';
import { urlLink } from '../../helper/route';
import { putCreateRoomSuccess, putCreateRoomFail } from './actions';
import { loadRepos, reposLoaded } from '../App/actions';
// Individual exports for testing
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
export function* apiputCreateRoom(payload) {
  const requestUrl = urlLink.api.serverUrl + urlLink.api.createRoom;
  const data = {
    idFloors: payload.payload.id,
    utilities: payload.payload.utilities,
    name: payload.payload.name,
    idElectricMetter: payload.payload.idElectricMetter,
    electricityPrice: payload.payload.electricityPrice,
    price: payload.payload.price,
    waterPrice: payload.payload.waterPrice,
    status: payload.payload.status,
    acreage: payload.payload.acreage,
    minimumMonths: payload.payload.minimumMonths,
    availableDate: payload.payload.availableDate,
    arrayUrlImage: payload.payload.arrayUrlImage,
    roomPassword: payload.payload.roomPassword,
    depositPrice: payload.payload.depositPrice,
    wifiPrice: payload.payload.wifiPrice,
    garbagePrice: payload.payload.garbagePrice,
  };
  yield put(loadRepos());
  try {
    const response = yield axios.post(requestUrl, data);
    // console.log(response.data.data[0]._id);
    yield put(putCreateRoomSuccess(response.data.data));
    // if (payload.payload.arrayCallImg.length > 0) {
    //   const n = payload.payload.arrayCallImg.length;
    //   // eslint-disable-next-line no-plusplus
    //   for (let i = 0; i < n; i++) {
    //     // eslint-disable-next-line no-undef
    //     apiPostImg(arrayCallImg[i]);
    //   }
    // }
    // eslint-disable-next-line no-underscore-dangle
    yield put(push(`/motel-detail/${response.data.data[0]._id}`));
  } catch (error) {
    yield put(putCreateRoomFail(error.response.data));
  } finally {
    yield put(reposLoaded());
  }
}

export default function* roomDetailSaga() {
  yield takeLatest(PUT_CREATE_ROOM, apiputCreateRoom);
}
