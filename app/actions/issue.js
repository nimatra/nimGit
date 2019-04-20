import * as types from '../constants/ActionTypes';
import { urlEncodeData, httpGetAsync } from '../utils/web';

const baseUrl = 'https://api.github.com/issues';
const params = {
  state: '',
  head: '',
  base: '',
  sort: '',
  direction: '',
  filter: '',
  access_token: {},
};
export function getIssuesStart(data) {
  return { type: types.GET_ISSUES_START, data };
}
export function getAssignedIssuesSuccess(data) {
  return { type: types.GET_ASSIGNED_ISSUES_SUCCESS, data };
}
export function getCreatedIssuesSuccess(data) {
  return { type: types.GET_CREATED_ISSUES_SUCCESS, data };
}
export function getMentionedIssuesSuccess(data) {
  return { type: types.GET_MENTIONED_ISSUES_SUCCESS, data };
}
export function getSubscribedIssuesSuccess(data) {
  return { type: types.GET_SUBSCRIBED_ISSUES_SUCCESS, data };
}
export function getAllIssuesSuccess(data) {
  return { type: types.GET_ALL_ISSUES_SUCCESS, data };
}
export function getIssuesError(data) {
  return { type: types.GET_ISSUES_ERROR, data };
}

// Indicates which sorts of issues to return. Can be one of:
// * assigned: Issues assigned to you
// * created: Issues created by you
// * mentioned: Issues mentioning you
// * subscribed: Issues you're subscribed to updates for
// * all: All issues the authenticated user can see, regardless of participation or creation
// Default: assigned
function getAssignedIssues(initialParams, getRequestUrl) {
  const myParams = { ...initialParams, filter: 'assigned' };
  const requestUrl = getRequestUrl(myParams);
  return dispatch => httpGetAsync(requestUrl, (response) => {
    const json = JSON.parse(response || []);
    dispatch(getAssignedIssuesSuccess(json));
  });
}
function getCreatedIssues(initialParams, getRequestUrl) {
  const myParams = { ...initialParams, filter: 'created' };
  const requestUrl = getRequestUrl(myParams);
  return dispatch => httpGetAsync(requestUrl, (response) => {
    const json = JSON.parse(response || []);
    dispatch(getCreatedIssuesSuccess(json));
  });
}
function getMentionedIssues(initialParams, getRequestUrl) {
  const myParams = { ...initialParams, filter: 'mentioned' };
  const requestUrl = getRequestUrl(myParams);
  return dispatch => httpGetAsync(requestUrl, (response) => {
    const json = JSON.parse(response || []);
    dispatch(getMentionedIssuesSuccess(json));
  });
}
function getSubscribedIssues(initialParams, getRequestUrl) {
  const myParams = { ...initialParams, filter: 'subscribed' };
  const requestUrl = getRequestUrl(myParams);
  return dispatch => httpGetAsync(requestUrl, (response) => {
    const json = JSON.parse(response || []);
    dispatch(getSubscribedIssuesSuccess(json));
  });
}
function getAllIssues(initialParams, getRequestUrl) {
  const myParams = { ...initialParams, filter: 'all' };
  const requestUrl = getRequestUrl(myParams);
  return dispatch => httpGetAsync(requestUrl, (response) => {
    const json = JSON.parse(response || []);
    dispatch(getAllIssuesSuccess(json));
  });
}
/**
 *
 * @export
 * @param {String} repoFullName
 * @param {String} token
 * @param {String} state
 * @param {String} head
 * @param {String} base
 * @param {String} sort
 * @param {String} direction
 * @returns
 */
export function getIssues(token, state, head, base, sort, direction) {
  params.access_token = token;
  params.base = base;
  params.head = head;
  params.sort = sort;
  params.direction = direction;
  params.state = state;

  const getRequestUrl = inParams => `${baseUrl}?${urlEncodeData(inParams)}`;
  return (dispatch) => {
    dispatch(getIssuesStart());
    dispatch(getAssignedIssues(params, getRequestUrl));
    dispatch(getCreatedIssues(params, getRequestUrl));
    dispatch(getMentionedIssues(params, getRequestUrl));
    dispatch(getSubscribedIssues(params, getRequestUrl));
    dispatch(getAllIssues(params, getRequestUrl));
  };
}

