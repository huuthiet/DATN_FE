import axios from 'axios';
import { push } from 'react-router-redux';
import { put, takeLatest } from 'redux-saga/effects';
import { urlLink } from '../../helper/route';
import { loadRepos, reposLoaded } from '../App/actions';
import { GET_MOTEL } from '../Motel/constants';
import { apiGetMotel } from '../Motel/saga';
import {
  postImgFail,
  postImgSuccess,
  putMotelFail,
  putMotelSuccess,
} from './actions';
import { POST_IMG, PUT_MOTEL } from './constants';
function isEmpty(obj) {
  // eslint-disable-next-line no-restricted-syntax
  for (const prop in obj) {
    if (Object.hasOwn(obj, prop)) {
      return false;
    }
  }

  return true;
}
// import { take, call, put, select } from 'redux-saga/effects';
export function* apiPutMotel(payload) {
  const { id, formData } = payload;
  const data = { id, formData };
  const { imageAction } = formData;

  if (!isEmpty(imageAction)) {
    apiPostImgAction(imageAction);
  }

  const requestUrl = urlLink.api.serverUrl + urlLink.api.motelDetail + id;

  yield put(loadRepos());
  try {
    const response = yield axios.put(requestUrl, data);
    yield put(putMotelSuccess(response.data.data));
    yield put(push(`/motel/${id}`));
  } catch (error) {
    yield put(putMotelFail(error.response.data));
  } finally {
    yield put(reposLoaded());
  }
}

export function* apiPostImg(payload) {
  const { id, formData } = payload;
  const requestUrl = `${urlLink.api.serverUrl +
    urlLink.api.motelDetail}img/${id}`;

  const config = {
    headers: {
      'content-type': 'multipart/form-data',
    },
  };

  yield put(loadRepos());
  try {
    const response = yield axios.post(requestUrl, formData, config);
    yield put(postImgSuccess(response.data));
  } catch (error) {
    yield put(postImgFail(error.response.data));
  } finally {
    yield put(reposLoaded());
  }
}

const apiPostImgAction = async payload => {
  const { id, formData } = payload;
  const requestUrl = `${urlLink.api.serverUrl +
    urlLink.api.motelDetail}img/${id}`;

  const config = {
    headers: {
      'content-type': 'multipart/form-data',
    },
  };

  try {
    const response = await axios.post(requestUrl, formData, config);

    if (response.data.data.images) {
      // setUrlImgCloud(response.data.data.images.imageUrl);
    }
  } catch (err) {
    console.error(err);
  }
};

export function* apiPostImgCall(payload) {
  const { id, formData } = payload;
  const requestUrl = `${urlLink.api.serverUrl +
    urlLink.api.motelDetail}img/${id}`;

  const config = {
    headers: {
      'content-type': 'multipart/form-data',
    },
  };

  yield put(loadRepos());
  try {
    return (response = yield axios.post(requestUrl, formData, config));
  } catch (error) {
    return error.response.data;
  } finally {
    yield put(reposLoaded());
  }
}
// Individual exports for testing
export default function* updateMotelSaga() {
  yield takeLatest(GET_MOTEL, apiGetMotel);
  yield takeLatest(PUT_MOTEL, apiPutMotel);
  yield takeLatest(POST_IMG, apiPostImg);
}
