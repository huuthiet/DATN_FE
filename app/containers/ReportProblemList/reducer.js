/*
 *
 * ReportProblemList reducer
 *
 */
import produce from 'immer';
import moment from 'moment';
import {
  GET_LIST_REPORT_PROBLEM_SUCCESS,
  GET_LIST_REPORT_PROBLEM_FAIL,
  POST_STATUS_REPORT_PROBLEM_SUCCESS,
  POST_STATUS_REPORT_PROBLEM_FAIL,
} from './constants';
export const initialState = {
  listReportProblem: [],
  action1: 0,
  action2: 0,
  action3: 0,
};

const typeStatusReportProblem = e => {
  if (e === 'waiting') {
    return 'Chờ tiếp nhận';
  } else if (e === 'processing') {
    return 'Đang xử lý';
  } else if (e === 'success') {
    return 'Đã xử lý';
  }
  return 'Chờ tiếp nhận';
};
const typeProcessingReportProblem = e => {
  if (e === 'processing') {
    return 'true';
  }
  return 'false';
};
const typeSuccessReportProblem = e => {
  if (e === 'success') {
    return 'true';
  }
  return 'false';
};

/* eslint-disable default-case, no-param-reassign */
const ReportProblemListReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_LIST_REPORT_PROBLEM_SUCCESS:
        for (let index = 0; index < action.response.length; index++) {
          const element = action.response[index];
          element.key = index + 1;
          element.idReportProblem = element.idReportProblem;
          element.dateBill = element.dateBill;
          element.dateReportProblem = moment(element.createdAt).format(
            'DD/MM/YYYY',
          );
          element.status = typeStatusReportProblem(element.status);
          element.nameMotel = element.motelRoom.name;
          element.nameRoom = element.room.name;
          element.nameUser =
            element.user.lastName + ' ' + element.user.firstName;
        }
        draft.listReportProblem = action.response;
        draft.action1 = 1;
        break;
      case GET_LIST_REPORT_PROBLEM_FAIL:
        draft.listReportProblem = action.error;
        break;
      case POST_STATUS_REPORT_PROBLEM_SUCCESS:
        draft.action2 = action.response;
        break;
      case POST_STATUS_REPORT_PROBLEM_FAIL:
        draft.action3 = action.error;
        break;
    }
  });

export default ReportProblemListReducer;
