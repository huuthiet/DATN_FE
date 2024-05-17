import { put, takeLatest, delay } from 'redux-saga/effects';
import axios from 'axios';
import { push } from 'react-router-redux';
import localStoreService from 'local-storage';
import { GET_PROFILE, POST_PROFILE_UPDATE } from './constants';
import { urlLink } from '../../helper/route';
import {
  getProfileSuccess,
  getProfileFail,
  postUpdateProfileSuccess,
  postUpdateProfileFail,
} from './actions';
import { loadRepos, reposLoaded } from '../App/actions';


export function* apiGetProfile() {
  const requestUrl = urlLink.api.serverUrl + urlLink.api.profile;
  yield put(loadRepos());
  try {
    const response = yield axios.get(requestUrl);
    yield put(getProfileSuccess(response.data.data));
  } catch (error) {
    yield put(getProfileFail(error.response));
  } finally {
    yield put(reposLoaded());
  }
}
function isEmpty(obj) {
  for (const prop in obj) {
    if (Object.hasOwn(obj, prop)) {
      return false;
    }
  }

  return true;
}

export function* apiPutRoomDetailUpdate(payload) {
  const payloadBody = payload.payload;

  // Image
  const payloadAvata = payloadBody.avatarAction;
  const payloadFrontId = payloadBody.frontIdAction;
  const payloadBackId = payloadBody.backIdAction;

  if (!isEmpty(payloadAvata)) {
    apiPostImg(payloadAvata);
  }
  if (!isEmpty(payloadFrontId)) {
    apiPostImgFront(payloadFrontId);
  }
  if (!isEmpty(payloadBackId)) {
    apiPostImgBack(payloadBackId);
  }

  yield put(loadRepos());
  try {
    const requestUrl = urlLink.api.serverUrl + urlLink.api.profile;
    const data = {
      // eslint-disable-next-line no-underscore-dangle
      _id: payloadBody._id,
      address: payloadBody.address,
      dobAction: payloadBody.dobAction,
      email: payloadBody.email,
      firstName: payloadBody.firstName,
      lastName: payloadBody.lastName,
      phoneNumber: payloadBody.phoneNumber,
      nationalId: payloadBody.nationalId,
      gender: payloadBody.gender.key,
    };
    const response = yield axios.put(requestUrl, data);
    yield put(postUpdateProfileSuccess(response.data.data));

  } catch (error) {
    // eslint-disable-next-line no-undef
    yield put(postUpdateProfileFail(error.response));
  } finally {
    yield put(reposLoaded());
  }
}
const apiPostImg = async payload => {
  const { id, formData } = payload;
  console.log({formData});
  // eslint-disable-next-line no-useless-concat
  const requestUrl = `${urlLink.api.serverUrl}/v1/uploading/img/${id}/user`;
  const config = {
    headers: {
      'content-type': 'multipart/form-data',
      Authorization: `Bearer ${localStoreService.get('user').token}`,
    },
  };
  try {
    const response = await axios.post(requestUrl, formData, config);
    if (response.data.data.images) {
      return 1;
    }
  } catch (err) {
    console.error(err);
  }
  return 0;
};
const apiPostImgFront = async payload => {
  const { id, formData } = payload;
  // eslint-disable-next-line no-useless-concat
  const requestUrl = `${urlLink.api.serverUrl
    }/v1/uploading/img/${id}/user/front`;
  const config = {
    headers: {
      'content-type': 'multipart/form-data',
      Authorization: `Bearer ${localStoreService.get('user').token}`,
    },
  };
  try {
    const response = await axios.post(requestUrl, formData, config);
    if (response.data.data.images) {
      return 1;
    }
  } catch (err) {
    console.error(err);
  }
  return 0;
};
const apiPostImgBack = async payload => {
  const { id, formData } = payload;
  // eslint-disable-next-line no-useless-concat
  const requestUrl = `${urlLink.api.serverUrl
    }/v1/uploading/img/${id}/user/back`;
  const config = {
    headers: {
      'content-type': 'multipart/form-data',
      Authorization: `Bearer ${localStoreService.get('user').token}`,
    },
  };
  try {
    const response = await axios.post(requestUrl, formData, config);
    if (response.data.data.images) {
      return 1;
    }
  } catch (err) {
    console.error(err);
  }
  return 0;
};

// Individual exports for testing
export default function* profileSaga() {
  yield takeLatest(GET_PROFILE, apiGetProfile);
  yield takeLatest(POST_PROFILE_UPDATE, apiPutRoomDetailUpdate);
}
