import { isEmpty } from 'lodash';
import * as ActionTypes from '../constants/ActionTypes';

const initialState = {
  activeRepo: {},
  repos: [],
  owners: [],
  token: {},
  user: {},
  username: '',
  isDarkThemeOn: false,
  isRepoValid: false,
  isTokenValid: false,
  isUserValid: false,
};

const actionsMap = {
  [ActionTypes.SET_TOKEN](state, action) {
    return Object.assign({}, state, { token: action.data });
  },
  [ActionTypes.SET_USER](state, action) {
    return Object.assign({}, state, { user: action.data });
  },
  [ActionTypes.SET_USERNAME](state, action) {
    return Object.assign({}, state, { username: action.data });
  },
  [ActionTypes.ADD_OWNER](state, action) {
    if (isEmpty(action.data)) {
      return state;
    }
    const allOwners = Object.assign({}, state.owners, { [`${action.data.login}`]: action.data });
    return Object.assign({}, state, { owners: allOwners });
  },
  [ActionTypes.REMOVE_OWNER](state, action) {
    if (isEmpty(action.data)) {
      return state;
    }
    return Object.assign(
      {},
      state,
      {
        owners: state.owners
        && Object.values(state.owners).filter(owner => owner.login !== action.data),
      }
    );
  },
  [ActionTypes.RESET](state, action) {
    return Object.assign(
      {},
      state,
      { owners: {}, repos: [] }
    );
  },
  [ActionTypes.ADD_REPO](state, action) {
    if (isEmpty(action.data)) {
      return state;
    }
    return Object.assign(
      {},
      state,
      { repos: state.repos ? [action.data, ...state.repos] : [action.data] }
    );
  },
  [ActionTypes.REMOVE_REPO](state, action) {
    if (isEmpty(action.data)) {
      return state;
    }
    return Object.assign(
      {},
      state,
      { repos: state.repos && state.repos.filter(repo => repo.name !== action.data) }
    );
  },
  [ActionTypes.SET_ACTIVE_REPO](state, action) {
    return Object.assign({}, state, { activeRepo: action.data });
  },
  [ActionTypes.SET_DARK_THEME](state, action) {
    return Object.assign({}, state, { isDarkThemeOn: action.data });
  },
  [ActionTypes.SET_IS_USER_VALID](state, action) {
    return Object.assign({}, state, { isUserValid: action.data });
  },
  [ActionTypes.SET_IS_TOKEN_VALID](state, action) {
    return Object.assign({}, state, { isTokenValid: action.data });
  },
  [ActionTypes.SET_IS_REPO_VALID](state, action) {
    return Object.assign({}, state, { isRepoValid: action.data });
  },
};

export default function settings(state = initialState, action) {
  const reduceFn = actionsMap[action.type];
  if (!reduceFn) return state;
  return reduceFn(state, action);
}
