import axios from 'axios';
import axiosFormData from 'axios';
import FormData from 'form-data';
import { put, takeLatest } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { GET_ROOM } from '../RoomDetail/constants';
import { apiGetRoom } from '../RoomDetail/saga';
// import { take, call, put, select } from 'redux-saga/effects';
import { urlLink } from '../../helper/route';
import { loadRepos, reposLoaded } from '../App/actions';
import { postJobFail, postJobSuccess, getBankInfoListSuccess, getBankInfoListFail } from './actions';
import { GET_BANK_INFO, POST_JOB } from './constants';
// import { GET_ROOM } from '../RoomPage/constants';

export function* apiPostJob(payload) {
  const { formData } = payload;
  console.log('formData in saga: ', formData);

  const requestUrl = urlLink.api.serverUrl + urlLink.api.job;
  const requestUrlPayWallet = urlLink.api.serverUrl + urlLink.api.pay;
  let response_job;

  try {
    console.log("Check formData: ", formData);

    // Kiểm tra xem có file không
    if (formData.imageFile instanceof File) {
      const reader = new FileReader();

      reader.onload = function (event) {
        formData.imageBase64 = event.target.result;
        axios.post(requestUrl, formData)
          .then(response => {
            console.log('response_job: ', response);
            response_job = response;
          })
          .catch(error => {
            console.error('Error posting job:', error);
          });
      };

      reader.readAsDataURL(formData.imageFile);
    } else {
      response_job = yield axios.post(requestUrl, formData);
      console.log('response_job: ', response_job);
    }

    try {
      if (formData.type === 'wallet') {
        // eslint-disable-next-line no-underscore-dangle
        const id = response_job.data.data.currentOrder._id;
        console.log('id: ', id);
        const payloadOder = {
          orderId: id,
          type: formData.type,
        };
        const response = yield axios.put(requestUrlPayWallet, payloadOder);
        // check user have NID
        try {
          const requestUrlProfile =
            urlLink.api.serverUrl + urlLink.api.profile;
          const responseProfile = yield axios.get(requestUrlProfile, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            ContentType: 'multipart/form-data',

          });
          if (responseProfile.data.data) {
            const profile = responseProfile.data.data;
            // eslint-disable-next-line eqeqeq
            if (!isEmpty(profile.backId) && !isEmpty(profile.frontId)) {
              // have NID- update NID to jobModel
              try {
                const requestUrlUpdateModel = `${urlLink.api.serverUrl +
                  urlLink.api.job}/${response.data.data.job}/images/profile`;
                yield axios.put(requestUrlUpdateModel, null);

                yield put(push('/profile'));
              } catch (error) {
                yield put(postJobSuccess(response));
              }
            } else {
              yield put(postJobSuccess(response));
            }
          }
        } catch (error) {
          yield put(postJobSuccess(response));
        }
      } else {
        yield put(postJobSuccess(response_job));

        yield put(push('/profile'));
      }
    } catch (error) {
      yield put(postJobFail(error.response.data));
    } finally {
      yield put(reposLoaded());
    }
  } catch (error) {
    yield put(postJobFail(error.response.data));
  } finally {
    yield put(reposLoaded());
  }
}

export function* apiBankInfo() {
  const requestUrl = urlLink.api.serverUrl + urlLink.api.getBankMasterList;
  try {
    const response = yield axios.get(requestUrl);
    if (response && response.data) {
      console.log('apiBankInfo -> responseeee', response);
      yield put(getBankInfoListSuccess(response.data.data));
    } else {
      yield put(getBankInfoListFail("Invalid response format"));
    }
  } catch (error) {
    if (error.response && error.response.data) {
      yield put(getBankInfoListFail(error.response.data));
    } else {
      yield put(getBankInfoListFail("Unknown error occurred"));
    }
  }
}



export
  function isEmpty(str) {
  return !str || str.length === 0;
}
// Individual exports for testing
export default function* jobSaga() {
  yield takeLatest(GET_ROOM, apiGetRoom);
  yield takeLatest(POST_JOB, apiPostJob);
  yield takeLatest(GET_BANK_INFO, apiBankInfo);
}
