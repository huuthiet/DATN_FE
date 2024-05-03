/*
 *
 * JobList reducer
 *
 */
import produce from 'immer';
import { GET_JOB_LIST_USER_FAIL, GET_JOB_LIST_USER_SUCCESS } from './constants';
import Money from '../App/format';
export const initialState = {
  jobsUser: [],
};
const methodPay = e => {
  if (e === 'internal') {
    return 'Ví nội bộ';
  }
  if (e === 'vnpay') {
    return 'Vnpay';
  }
  if (e === 'cash') {
    return 'Tiền mặt';
  }
  return 'Chưa thanh toán';
};
const typePay = e => {
  if (e === 'deposit') {
    return 'Tiền đặt cọc';
  }
  if (e === 'afterCheckInCost') {
    return 'Tiền khi nhận phòng';
  }
  if (e === 'monthly') return 'Tiền hàng tháng';
  return 'Nạp tiền vào ví';
};
/* eslint-disable default-case, no-param-reassign */
const jobListUserReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_JOB_LIST_USER_SUCCESS:
        if (action.response) {
          // eslint-disable-next-line no-plusplus
          for (let index = 0; index < action.response.data.length; index++) {
            const element = action.response.data[index];
            element.key = index + 1;
            element.amount = Money(element.amount);
            element.paymentMethod = methodPay(element.paymentMethod);
            element.type = typePay(element.type);
            element.description = element.description;
          }
        }
        draft.jobsUser = action.response.data;
        break;
      case GET_JOB_LIST_USER_FAIL:
        draft.jobsUser = action.error;
        break;
    }
  });

export default jobListUserReducer;
