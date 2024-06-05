import produce from 'immer';
import {
  GET_LIST_ROOM_FAIL,
  GET_LIST_ROOM_SUCCESS,
  GET_HOST_REVENUE_SUCCESS,
  GET_HOST_REVENUE_FAIL,
  POST_WITHDRAW,
  POST_WITHDRAW_SUCCESS,
  POST_WITHDRAW_FAIL,
} from './constants';

export const initialState = {
  listRoom: {},
  hostRevenue: [],
  action1: 0,
  withdraw: [],
};

/* eslint-disable default-case, no-param-reassign */
const hostMotelRoomDetailUserReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_LIST_ROOM_SUCCESS:
        console.log('action.response', action.response);
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
      case POST_WITHDRAW:
        draft.withdraw = action.response;
        break;
      case POST_WITHDRAW_SUCCESS:
        draft.withdraw = action.response;
        break;
      case POST_WITHDRAW_FAIL:
        draft.withdraw = action.error;
        break;
    }
  });

export default hostMotelRoomDetailUserReducer;
