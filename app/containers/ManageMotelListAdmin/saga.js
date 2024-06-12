import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import {
  GET_MOTEL_LIST,
  DELETE_MOTEL,
} from './constants';
import { urlLink } from '../../helper/route';
import {
  getMotelListSuccess,
  getMotelListFail,
  getBuildingRevenueSuccess,
  getBuildingRevenueFail,
  deleteMotelSuccess,
  deleteMotelFail,
  getMotelList,
} from './actions';
import { loadRepos, reposLoaded } from '../App/actions';

// export function* apiGetMotelList(payload) {
//   const { id } = payload;

//   const currentDate = new Date();
//   const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 2);
//   const formattedStartDate = firstDay.toISOString().slice(0, 10);
//   const formattedCurrentDate = currentDate.toISOString().slice(0, 10);
//   console.log("formattedStartDate", formattedStartDate);
//   console.log("formattedCurrentDate", formattedCurrentDate);

//   const requestRevenueUrl = urlLink.api.serverUrl + urlLink.api.buildingRevenue + id + `/${formattedStartDate}/${formattedCurrentDate}`;

//   // const requestUrl = urlLink.api.serverUrl + urlLink.api.getListMotelByHost + id;
//   // //GET MOTEL LIST
//   // try {
//   //   const response = yield axios.get(requestUrl);
//   //   console.log("response motel list: ", response.data.data);
//   //   yield put(getMotelListSuccess(response.data.data));
//   // } catch (error) {
//   //   yield put(getMotelListFail(error.response.data));
//   // } finally {
//   //   yield put(reposLoaded());
//   // }
//   yield put(loadRepos());
//   //GET BUILDING REVENUE
//   try {
//     const responseRevenue = yield axios.get(requestRevenueUrl);
//     console.log("responseRevenue: ", responseRevenue.data.data);
//     yield put(getBuildingRevenueSuccess(responseRevenue.data.data));
//   } catch (error) {
//     yield put(getBuildingRevenueFail(error.response.data));
//   } finally {
//     yield put(reposLoaded());
//   }
// }

// export function* apiGetBuildingRevenue(payload) {
//   const { id } = payload;
//   console.log("Check id: ", id);
//   //get current date format yyyy-mm-dd

// }


export function* apiGetMotelList(payload) {
  const { id } = payload;
  const requestUrl = urlLink.api.serverUrl + urlLink.api.getRoomListAdminByOwner + id;
  yield put(loadRepos());
  try {
    const response = yield axios.get(requestUrl);
    console.log({response});
    yield put(getMotelListSuccess(response.data.data));
  } catch (error) {
    yield put(getMotelListFail(error.response.data));
  } finally {
    yield put(reposLoaded());
  }
}

export function* apiDeleteMotel(payload) {
  console.log({payload});
  const requestUrl = `${urlLink.api.serverUrl + urlLink.api.deleteMotelByAdmin}${payload.id}`;
  yield put(loadRepos());
  try {
    const response = yield axios.delete(requestUrl);
    yield put(deleteMotelSuccess(response.data.data));
    yield put(getMotelList(payload.idHost));
  } catch (error) {
    yield put(deleteMotelFail(error.response.data));
  } finally {
    yield put(reposLoaded());
  }
}

export default function* profileSaga() {
  yield takeLatest(GET_MOTEL_LIST, apiGetMotelList);
  yield takeLatest(DELETE_MOTEL, apiDeleteMotel);
  // yield takeLatest(GET_BUILDING_REVENUE, apiGetBuildingRevenue);
}
