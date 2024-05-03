/*
 *
 * HistoryRoomHostAdmin reducer
 *
 */
import produce from 'immer';
import { GET_MOTEL_ROOM_SUCCESS } from './constants';
export const initialState = {
  MotelRoom: [],
  MotelRoomNone: [],
  error: [],
};

/* eslint-disable default-case, no-param-reassign */
const historyRoomHostReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_MOTEL_ROOM_SUCCESS:
        for (let index = 0; index < action.response.data.length; index++) {
          const element = action.response.data[index];
          element.key = index + 1;
          element.name = element.name;
          element.images = element.images;
          if (element.address) {
            element.address = element.address.address;
          }
          element.phone =
            element.owner.phoneNumber.countryCode +
            element.owner.phoneNumber.number;
        }
        draft.MotelRoom = action.response.data;
        break;
    }
  });

export default historyRoomHostReducer;
