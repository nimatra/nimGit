import * as ActionTypes from '../constants/ActionTypes';

const initialState = {
  sync: false,
  error: {},
  repoList: [],
};

const actionsMap = {
  [ActionTypes.GET_REPOS_START](state, action) {
    return Object.assign({}, state, { sync: true, error: {}, repoList: [] });
  },
  [ActionTypes.GET_REPOS_SUCCESS](state, action) {
    return Object.assign({}, state, { sync: false, error: {}, repoList: action.data });
  },
  [ActionTypes.GET_REPOS_ERROR](state, action) {
    return Object.assign({}, state, { sync: false, error: action.data, repoList: [] });
  },
  [ActionTypes.RESET](state, action) {
    return Object.assign(
      {},
      state,
      { repoList: [] }
    );
  },
};

export default function repo(state = initialState, action) {
  const reduceFn = actionsMap[action.type];
  if (!reduceFn) return state;
  return reduceFn(state, action);
}
