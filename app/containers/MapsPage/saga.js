import { put, takeLatest } from 'redux-saga/effects';
import { GET_LIST_ROOM } from './constants';
import { urlLink } from '../../helper/route';
import { getListRoomSuccess, getListRoomFail } from './actions';
import axios from 'axios';
import { loadRepos, reposLoaded } from '../App/actions';

// Individual exports for testing
export function* apiGetListRoom(payload) {
    const requestUrl = urlLink.api.serverUrl + urlLink.api.motelList;
    console.log("API", requestUrl);
    yield put(loadRepos());
    try {
        const response = yield axios.get(requestUrl);
        console.log({response})
        yield put(getListRoomSuccess(response.data.data.data));
    } catch (error) {
        yield put(getListRoomFail(error.response.data));
    } finally {
        yield put(reposLoaded());
    }
}

// export function* apiGetListRoom(payload) {
//     console.log("payyyy", payload);
//     const requestUrl = urlLink.api.serverUrl + urlLink.api.searchMotel;
//     console.log({requestUrl})
//     // const requestUrl = "http://localhost:5502/api/v1/homeKey/motelRoom/searchMotels";
//     yield put(loadRepos());
//     try {
//         const valueFilter = {
//             address: 'Viet Nam',
//             minPrice: 0,
//             maxPrice: 100000000,
//             utilities: ["wifi","bon_cau", "dieu_hoa", "truyen_hinh", "voi_hoa_sen",
//               "giat_ui", "giu_xe", "gac_lung", "bon_rua_mat", "don_phong",
//               "san_go", "tu_quan_ao", "gio_giac_tu_do", "loi_di_rieng"]
//           }
//         const response = yield axios.post(requestUrl, payload.payload);
//         console.log({response})
//         yield put(getListRoomSuccess(response.data.data.listMotel));
//     } catch (error) {
//         yield put(getListRoomFail(error.response.data));
//     } finally {
//         yield put(reposLoaded());
//     }
// }

// export function* apiGetProfile() {
//     const requestUrl = urlLink.api.serverUrl + urlLink.api.profile;
//     yield put(loadRepos());
//     try {
//       const response = yield axios.get(requestUrl);
//       yield put(getProfileSuccess(response.data.data));
//     } catch (error) {
//       yield put(getProfileFail(error.response.data));
//     } finally {
//       yield put(reposLoaded());
//     }
//   }

export default function* mapsPageSaga() {
    yield takeLatest(GET_LIST_ROOM, apiGetListRoom);
}