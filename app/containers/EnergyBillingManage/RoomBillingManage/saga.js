import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { urlLink } from '../../../helper/route';
import { loadRepos, reposLoaded } from '../../App/actions';
import {
  getDataEnergyPerMonthError,
  getDataEnergyPerMonthSuccess,
} from './actions';
import { GET_DATA_ENERGY_PER_MONTH } from './constants';

export function* apiGetEnergyBilling(payload) {
  const { id } = payload;
  const requestUrl =
    urlLink.api.serverUrl + urlLink.api.getDataEnergyPerMonth + id;
  yield put(loadRepos());
  try {
    const response = yield axios.get(requestUrl);
    yield put(getDataEnergyPerMonthSuccess(response.data.data));
  } catch (error) {
    yield put(getDataEnergyPerMonthError(error.data.data));
  } finally {
    yield put(reposLoaded());
  }
}

export default function* energyBillingSage() {
  yield takeLatest(GET_DATA_ENERGY_PER_MONTH, apiGetEnergyBilling);
}
