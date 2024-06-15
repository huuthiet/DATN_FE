import axios from 'axios';
import { push } from 'react-router-redux';
import { put, takeLatest } from 'redux-saga/effects';
import localStore from 'local-storage';
import { urlLink } from '../../helper/route';
import { loadRepos, reposLoaded } from '../App/actions';
import { putImagesFail, putImagesSuccess } from './actions';
import { PUT_IMAGES } from './constants';

export function* apiPutImages(payload) {
  const { id, idElectricMetter, formData } = payload;
  const requestUrl = urlLink.api.serverUrl + urlLink.api.job + `/${id}` + `/images`;
  console.log('requestUrl', requestUrl);
  yield put(loadRepos());
  try {
    const response = yield axios.put(requestUrl, formData);
    yield put(putImagesSuccess(response));
    // Nếu xác minh thành công, thực hiện yêu cầu PUT để active phòng
    try {
      const activeRequestUrl = `${urlLink.api.serverUrl}${urlLink.api.job}/${id}/active`;
      yield axios.put(activeRequestUrl);
      yield put(push(`/job-detail/${id}/${idElectricMetter}`));
    } catch (error) {
      console.log(error);
      yield put(push('/profile'));
    }
  } catch (error) {
    yield put(putImagesFail(error.response.data));
  } finally {
    yield put(reposLoaded());
  }
}


export default function* jobVerifySaga() {
  yield takeLatest(PUT_IMAGES, apiPutImages);
}
