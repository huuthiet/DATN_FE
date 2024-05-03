/*
 *
 * JobList reducer
 *
 */
import produce from 'immer';
import { GET_JOB_LIST_SUCCESS, GET_JOB_LIST_FAIL } from './constants';
import Money from '../App/format';
export const initialState = {
  jobs: [],
};

/* eslint-disable default-case, no-param-reassign */
const jobListReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_JOB_LIST_SUCCESS:
        if (action.response) {
          // eslint-disable-next-line no-plusplus
          for (let index = 0; index < action.response.data.length; index++) {
            const element = action.response.data[index];
            element.key = index + 1;
            element.fullName = element.fullName;
            element.phoneNumber = element.phoneNumber;
            element.total = Money(element.total || 0);
          }
        }
        draft.jobs = action.response.data;
        break;
      case GET_JOB_LIST_FAIL:
        draft.jobs = action.error;
        break;
    }
  });

export default jobListReducer;
