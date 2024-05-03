/*
 *
 * LoginPage reducer
 *
 */
import produce from 'immer';
import { POST_SIGN_IN_SUCCESS, POST_SIGN_IN_FAIL } from './constants';

export const initialState = {
  currentUser: {},
  loginError: {},
};

/* eslint-disable default-case, no-param-reassign */
const loginPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case POST_SIGN_IN_SUCCESS:
        draft.currentUser = action.response;
        break;
      case POST_SIGN_IN_FAIL:
        draft.loginError = action.error.errors[0];
        break;
    }
  });

export default loginPageReducer;
