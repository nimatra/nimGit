import * as ActionTypes from '../constants/ActionTypes';

const initialState = {
  sync: false,
  error: {},
  assignedIssueList: [],
  createdIssueList: [],
  mentionedIssueList: [],
  subscribedIssueList: [],
  allIssueList: [],
};

const actionsMap = {
  [ActionTypes.GET_ISSUES_START](state, action) {
    return Object.assign({}, state, { sync: true,
      error: {},
      assignedIssueList: [],
      createdIssueList: [],
      mentionedIssueList: [],
      subscribedIssueList: [],
      allIssueList: [] });
  },
  [ActionTypes.GET_ASSIGNED_ISSUES_SUCCESS](state, action) {
    return Object.assign({}, state, { sync: false, error: {}, assignedIssueList: action.data });
  },
  [ActionTypes.GET_CREATED_ISSUES_SUCCESS](state, action) {
    return Object.assign({}, state, { sync: false, error: {}, createdIssueList: action.data });
  },
  [ActionTypes.GET_MENTIONED_ISSUES_SUCCESS](state, action) {
    return Object.assign({}, state, { sync: false, error: {}, mentionedIssueList: action.data });
  },
  [ActionTypes.GET_SUBSCRIBED_ISSUES_SUCCESS](state, action) {
    return Object.assign({}, state, { sync: false, error: {}, subscribedIssueList: action.data });
  },
  [ActionTypes.GET_ALL_ISSUES_SUCCESS](state, action) {
    return Object.assign({}, state, { sync: false, error: {}, allIssueList: action.data });
  },
  [ActionTypes.GET_ISSUES_ERROR](state, action) {
    return Object.assign({}, state, { sync: false, error: action.data });
  },
};

export default function issue(state = initialState, action) {
  const reduceFn = actionsMap[action.type];
  if (!reduceFn) return state;
  return reduceFn(state, action);
}
