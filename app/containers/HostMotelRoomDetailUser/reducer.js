/*
 *
 * LoginPage reducer
 *
 */
import produce from 'immer';
import moment from 'moment';
import Money from '../App/format';
import { GET_LIST_ROOM_FAIL, GET_LIST_ROOM_SUCCESS } from './constants';
export const initialState = {
  listRoom: [],
  action1: 0,
};

/* eslint-disable default-case, no-param-reassign */
const hostMotelRoomDetailUserReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_LIST_ROOM_SUCCESS:
        for (let index = 0; index < action.response.length; index++) {
          const today = new Date();
          const element = action.response[index];
          element.key = index + 1;
          element.keyName = element.motelRoom.name;
          element.nameRoom = element.room.name;
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
          element.lastDay = moment(
            new Date(today.getFullYear(), today.getMonth() + 1, 0),
          ).format('DD/MM/YYYY');
          element.currentPrice = Money(element.currentOrder.amount);
          element.priceMoney = Money(element.price);
          element.description = element.currentOrder.description;

          const orderDataArrData = element.orderData;
          // eslint-disable-next-line no-unused-vars
          let sumOrder = 0;
          for (let indexI = 0; indexI < orderDataArrData.length; indexI++) {
            const elementOrderData = orderDataArrData[indexI];
            if (elementOrderData.isCompleted) {
              sumOrder += elementOrderData.amount;
            }
          }
          element.sumOrder = Money(sumOrder);
        }
        draft.listRoom = action.response;
        draft.action1 = 1;
        break;
      case GET_LIST_ROOM_FAIL:
        draft.listRoom = action.error;
        break;
    }
  });

export default hostMotelRoomDetailUserReducer;
