/*
 *
 * BillList reducer
 *
 */
import produce from 'immer';
import { GET_LIST_BILL_FAIL, GET_LIST_BILL_SUCCESS } from './constants';
export const initialState = {
  listBill: [],
  action1: 0,
};

/* eslint-disable default-case, no-param-reassign */
const billListReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_LIST_BILL_SUCCESS:
        for (let index = 0; index < action.response.length; index++) {
          const element = action.response[index];
          element.key = index + 1;
          element.idBill = element.idBill;
          element.dateBill = element.dateBill;
          element.nameMotel = element.nameMotel;
          element.nameRoom = element.nameRoom;
          element.nameUser = element.nameUser;
          element.phoneUser = element.phoneUser;
          element.totalAll = element.totalAll;
          element.emailOwner = element.emailOwner;
        }
        draft.listBill = action.response;
        draft.action1 = 1;
        break;
      case GET_LIST_BILL_FAIL:
        draft.listBill = action.error;
        break;
    }
  });

export default billListReducer;
