/*
 *
 * HistoryFloorsRoomHostDetail reducer
 *
 */
import produce from 'immer';
import moment from 'moment';
import { GET_MOTEL_ROOM_SUCCESS } from './constants';
import Money from '../App/format';
export const initialState = {
  MotelRoom: [],
  MotelRoomNone: [],
  error: [],
};
const typeStatusRoom = e => {
  if (e === 'rented' || e === 'deposited') {
    return 'Đã Thuê';
  }
  return 'Chưa Thuê';
};

const actionStatusRoom = e => {
  if (e === 'rented' || e === 'deposited') {
    return 'action';
  }
  return '';
};

/* eslint-disable default-case, no-param-reassign */
const historyFloorsRoomHostDetailReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_MOTEL_ROOM_SUCCESS:
        // eslint-disable-next-line no-case-declarations
        for (let index = 0; index < action.response.length; index++) {
          const today = new Date();
          const element = action.response[index];
          element.key = index + 1;
          element.userName = `${element.user.lastName} ${
            element.user.firstName
          }`;
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
          // element.lastDay = moment(
          //   new Date(today.getFullYear(), today.getMonth() + 1, 0),
          // ).format('DD/MM/YYYY');

          if(element.currentOrder.isCompleted === false) {
            element.lastDay = moment(new Date(element.currentOrder.expireTime)).format('DD/MM/YYYY');
            element.currentPrice = Money(parseInt(element.currentOrder.amount.toFixed(0))) + " VNĐ";
            element.description = element.currentOrder.description;
          }
          element.priceMoney = Money(element.price) + " VNĐ";
          const orderDataArrData = element.orders;
          // eslint-disable-next-line no-unused-vars
          let sumOrder = 0;
          for (let indexI = 0; indexI < orderDataArrData.length; indexI++) {
            const elementOrderData = orderDataArrData[indexI];
            if (elementOrderData.isCompleted) {
              sumOrder += parseFloat(elementOrderData.amount);
            }
          }
          element.sumOrder = Money(parseInt(sumOrder.toFixed(0))) + " VNĐ";
          // element.sumOrder = parseFloat(sumOrder.toFixed(2));
        }
        draft.MotelRoom = action.response;
        break;
    }
  });

export default historyFloorsRoomHostDetailReducer;
