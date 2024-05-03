import { put, takeLatest } from 'redux-saga/effects';
import localStoreService from 'local-storage';
import axios from 'axios';
import { push } from 'react-router-redux';
import { POST_PASSWORD_REISSUE } from './constants';
import { urlLink } from '../../helper/route';
import { postPasswordReissueSuccess, postPasswordReissueFail } from './actions';
import { loadRepos, reposLoaded, saveCurrentUser } from '../App/actions';

export function* apiPostPasswordReissue(payload) {

	const requestUrl = urlLink.api.serverUrl + urlLink.api.auth.passwordReissue;

	const data = {
		email: payload.payload.email,
		tokenKey: payload.payload.tokenKey,
		password: payload.payload.password,
		confirmPassword: payload.payload.confirmPassword,
	}
	yield put(loadRepos());
	try {
		const response = yield axios.put(requestUrl, data);
		yield put(postPasswordReissueSuccess(response));
	} catch (error) {
		if (error.response) {
			const { data: errors = {} } = error.response;
			yield put(postPasswordReissueFail(errors));
		} else {
			const offlineData = {
				data: [],
				error: true,
				errors: [
					{ errorCode: 4, errorMessage: 'Error: 500 server internal error' },
				],
			};
			yield put(postPasswordReissueFail(offlineData));
		}

	} finally {
		yield put(reposLoaded());
	}


}
// Individual exports for testing
export default function* passwordReissuePageSaga() {
	yield takeLatest(POST_PASSWORD_REISSUE, apiPostPasswordReissue);
}
