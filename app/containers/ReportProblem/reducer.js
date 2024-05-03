/*
 *
 * ReportProblem reducer
 *
 */
import produce from 'immer';
import moment from 'moment';
import {
  GET_JOB_DETAIL,
  GET_JOB_DETAIL_SUCCESS,
  GET_JOB_DETAIL_FAIL,
} from './constants';
export const initialState = {
  listMotelRoom: [],
  reportProblemData: {},
  errorFile: '',
  fileSuccess: {},
};
const getRandomInt = (min, max) =>
  Math.floor(Math.random() * (max - min)) + min;
const getRandomString = (length, base) => {
  let result = '';
  const baseLength = base.length;

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < length; i++) {
    const randomIndex = getRandomInt(0, baseLength);
    result += base[randomIndex];
  }

  return result;
};
const getRandomHex2 = () => {
  const baseString =
    '0123456789QƯERTYUIOPASDFGHJKLZXCVBNMqưertyuiopasdfghjklzxcvbnm';
  const ma = `${getRandomString(12, baseString)}`;
  return ma;
};

/* eslint-disable default-case, no-param-reassign */
const reportProblemReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_JOB_DETAIL_SUCCESS:
        const dateNow = new Date();
        draft.listMotelRoom = action.response;
        const dataJson = {
          idReportProblem: '',
          dateReportProblem: moment(dateNow).format('DD/MM/YYYY'),
          motelRoom: '',
          IdMotelRoom: '',
          user: '',
          IdUser: '',
          room: '',
          IdRoom: '',
          description: '',
          image: '',
        };
        if (action.response) {
          if (action.response.motelRoom) {
            dataJson.motelRoom = action.response.motelRoom.name;
            dataJson.IdMotelRoom = action.response.motelRoom._id;
          }
          if (action.response.motelRoom) {
            dataJson.user = action.response.user.name;
            dataJson.IdUser = action.response.user._id;
          }
          if (action.response.motelRoom) {
            dataJson.room = action.response.room.name;
            dataJson.IdRoom = action.response.room._id;
          }
        }
        draft.reportProblemData = dataJson;
        break;
      case GET_JOB_DETAIL_FAIL:
        draft.listMotelRoom = action.error;
        break;
    }
  });

export default reportProblemReducer;
