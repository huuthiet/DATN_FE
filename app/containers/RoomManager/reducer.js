/*
 *
 * RoomManage reducer
 *
 */
import produce from 'immer';
import moment from 'moment';
import { CHANGE_STORE_DATA, GET_LIST_ROOM_SUCCESS } from './constants';
export const initialState = {
  users: [],
  error: {},
  showSuccessPopup: false,
  showErrorPopup: false,
  showWarningPopup: false,
  job: [],
};

/* eslint-disable default-case, no-param-reassign */
const roomManageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case CHANGE_STORE_DATA:
        draft[action.key] = action.value;
        break;
      case GET_LIST_ROOM_SUCCESS:
        const resData = [];
        if (action.response) {
          const today = new Date();
          // eslint-disable-next-line no-plusplus
          let count = 0;
          for (let index = 0; index < action.response.length; index++) {
            const element = action.response[index];
            if (element) {
              element.key = count + 1;
              element.phoneNumber = element.phoneNumber;
              element.roomKey = element.room.key;
              const checkInTimeKey = element.checkInTime;
              element.checkInTime = moment(element.checkInTime).format(
                'DD/MM/YYYY',
              );
              element.checkOutTime = moment(
                new Date(checkInTimeKey).setMonth(
                  new Date(checkInTimeKey).getMonth() +
                    Number(element.rentalPeriod),
                ),
              ).format('DD/MM/YYYY');
              element.lastDay = moment(
                new Date(today.getFullYear(), today.getMonth() + 1, 0),
              ).format('DD/MM/YYYY');
              element.checkInOutTime =
                element.status === 'pendingMonthlyPayment'
                  ? 'Chưa Thanh Toán'
                  : `Đã Thanh Toán Tháng ${moment(checkInTimeKey).format('M')}`;
              count = count + 1;
              resData.push(element);
            }
          }
        }
        draft.job = resData;
        break;
    }
  });

export default roomManageReducer;
