import * as ActionTypes from '../constants/ActionTypes';

const initialState = {
  sync: false,
  error: {},
  pullRequestList: [],
};

const actionsMap = {
  [ActionTypes.GET_PULL_REQUESTS_START](state, action) {
    return Object.assign({}, state, { sync: true, error: {}, pullRequestList: [] });
  },
  [ActionTypes.GET_PULL_REQUESTS_SUCCESS](state, action) {
    return Object.assign({}, state, { sync: false, error: {}, pullRequestList: action.data });
  },
  [ActionTypes.GET_PULL_REQUESTS_ERROR](state, action) {
    return Object.assign({}, state, { sync: false, error: action.data, pullRequestList: [] });
  },
  [ActionTypes.RESET](state, action) {
    return Object.assign(
      {},
      state,
      { pullRequestList: [] }
    );
  },
};

export default function pullRequest(state = initialState, action) {
  const reduceFn = actionsMap[action.type];
  if (!reduceFn) return state;
  return reduceFn(state, action);
}
