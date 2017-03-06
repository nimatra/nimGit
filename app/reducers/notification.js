import * as ActionTypes from '../constants/ActionTypes';

const initialState = {
  sync: false,
  error: {},
  notificationList: [],
};

const actionsMap = {
  [ActionTypes.GET_NOTIFICATIONS_START](state, action) {
    return Object.assign({}, state, { sync: true, error: {}, notificationList: [] });
  },
  [ActionTypes.GET_NOTIFICATIONS_SUCCESS](state, action) {
    return Object.assign({}, state, { sync: false, error: {}, notificationList: action.data });
  },
  [ActionTypes.GET_NOTIFICATIONS_ERROR](state, action) {
    return Object.assign({}, state, { sync: false, error: action.data, notificationList: [] });
  },
};

export default function notification(state = initialState, action) {
  const reduceFn = actionsMap[action.type];
  if (!reduceFn) return state;
  return reduceFn(state, action);
}
