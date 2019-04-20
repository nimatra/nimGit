import * as ActionTypes from '../constants/ActionTypes';
import * as Pages from '../constants/Pages';

const initialState = {
  activePage: Pages.PULL_REQUESTS,
};

const actionsMap = {
  [ActionTypes.NAVIGATE_TO](state, action) {
    return Object.assign({}, state, { activePage: action.data });
  },
};

export default function navigation(state = initialState, action) {
  const reduceFn = actionsMap[action.type];
  if (!reduceFn) return state;
  return reduceFn(state, action);
}
