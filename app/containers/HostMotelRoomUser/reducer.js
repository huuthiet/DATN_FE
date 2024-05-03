/*
 *
 * LoginPage reducer
 *
 */
import produce from 'immer';
import {
  GET_LIST_ROOM_SUCCESS_USER,
  GET_LIST_ROOM_FAIL_USER,
} from './constants';
import Money from '../App/format';
export const initialState = {
  listMotelRoom: [],
};

/* eslint-disable default-case, no-param-reassign */
const hostMotelRoomUserReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_LIST_ROOM_SUCCESS_USER:
        draft.listMotelRoom = action.response;
        for (let index = 0; index < action.response.length; index++) {
          const today = new Date();
          const element = action.response[index];
          element.key = index + 1;
          element.hostName = element.fullName;
        }
        console.log(draft.listMotelRoom);
        break;
      case GET_LIST_ROOM_FAIL_USER:
        draft.listMotelRoom = action.error;
        break;
    }
  });

export default hostMotelRoomUserReducer;
