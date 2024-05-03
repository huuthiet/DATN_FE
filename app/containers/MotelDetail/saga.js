import { GET_MOTEL } from "../Motel/constants";
import { apiGetMotel } from "../Motel/saga";
import { put, takeLatest } from 'redux-saga/effects';

// Individual exports for testing
export default function* motelDetailSaga() {
  yield takeLatest(GET_MOTEL, apiGetMotel);
}
