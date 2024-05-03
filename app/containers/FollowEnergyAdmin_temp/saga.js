import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import {
  GET_DATA_ENERGY_PER_HOUR,
  GET_DATA_ENERGY_PER_DAY,
  } from './constants';
import { urlLink } from '../../helper/route';
import {
  getDataEnergyPerHourSuccess,
  getDataEnergyPerHourFail,
  getDataEnergyPerDaySuccess,
  getDataEnergyPerDayFail,
} from './actions';
import { loadRepos, reposLoaded } from '../App/actions';

export function* apiDataEnergyPerHour(payload) {
  const { id } = payload;
  const requestUrl = `http://localhost:5502/api/v1/homeKey/energy/device/currentDayDataPerHour/${id}`;
  yield put(loadRepos());
  try {
    const response = yield axios.get(requestUrl);
    yield put(getDataEnergyPerHourSuccess(response.data.data));
  } catch (error) {
    yield put(getDataEnergyPerHourFail(error.response.data));
  } finally {
    yield put(reposLoaded());
  }
}

export function* apiDataEnergyPerDay(payload) {
  const { id } = payload;
  const requestUrl = `http://localhost:5502/api/v1/homeKey/energy/device/currentMonDataPerDay/${id}/2024/01`;
  yield put(loadRepos());
  try {
    const response = yield axios.get(requestUrl);
    yield put(getDataEnergyPerDaySuccess(response.data.data));
  } catch (error) {
    yield put(getDataEnergyPerDayFail(error.response.data));
  } finally {
    yield put(reposLoaded());
  }
}

export default function* dataEnergySaga() {
  yield takeLatest(GET_DATA_ENERGY_PER_HOUR, apiDataEnergyPerHour);
  yield takeLatest(GET_DATA_ENERGY_PER_DAY, apiDataEnergyPerDay);
}