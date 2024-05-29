import produce from 'immer';
import { GET_LIST_ROOM_FAIL, GET_LIST_ROOM_SUCCESS, GET_HOST_REVENUE_SUCCESS, GET_HOST_REVENUE_FAIL } from './constants';

export const initialState = {
  listRoom: [],
  hostRevenue: [],
  action1: 0,
};

/* eslint-disable default-case, no-param-reassign */
const hostMotelRoomDetailUserReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_LIST_ROOM_SUCCESS:
        draft.listRoom = action.response;

        break;
      case GET_LIST_ROOM_FAIL:
        draft.listRoom = action.error;
        break;
      case GET_HOST_REVENUE_SUCCESS:
        draft.hostRevenue = action.response;
        break;
      case GET_HOST_REVENUE_FAIL:
        draft.hostRevenue = action.error;
        break;
    }
  });

export default hostMotelRoomDetailUserReducer;
