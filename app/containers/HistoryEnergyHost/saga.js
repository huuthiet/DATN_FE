import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';
import { urlLink } from '../../helper/route';
import { loadRepos, reposLoaded } from '../App/actions';
import { 
  getHistoryEnergyPerMonthSuccess,
  getHistoryEnergyPerMonthFail,
} from './actions';
import { GET_HISTORY_ENERGY_PER_MONTH } from './constants';

export function* apiGetHistoryEnergyPerMonth(payload) {
  const { data } = payload;
  console.log({payload})
  const url = `${urlLink.api.serverUrl}${urlLink.api.getHistoryEnergyByRoomV2}${data.id}/${data.selectedYear}`;
  console.log({url})
  yield put(loadRepos());
  try {
    const response = yield axios.get(url);
    console.log({response});
    yield put(getHistoryEnergyPerMonthSuccess(response.data.data));
  } catch (error) {
    yield put(getHistoryEnergyPerMonthFail(error.response.data));
  } finally {
    yield put(reposLoaded());
  }
}

// Individual exports for testing
export default function* TransactionLogSaga() {
  yield takeLatest(GET_HISTORY_ENERGY_PER_MONTH, apiGetHistoryEnergyPerMonth);
}
