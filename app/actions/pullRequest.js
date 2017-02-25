import * as types from '../constants/ActionTypes';
import { urlEncodeData, httpGetAsync } from '../utils/web';

const baseUrl = 'https://api.github.com/repos';
const params = {
  state: '',
  head: '',
  base: '',
  sort: '',
  direction: '',
  access_token: {},
};
export function getPullRequestsStart(data) {
  return { type: types.GET_PULL_REQUESTS_START, data };
}
export function getPullRequestsSuccess(data) {
  return { type: types.GET_PULL_REQUESTS_SUCCESS, data };
}
export function getPullRequestsError(data) {
  return { type: types.GET_PULL_REQUESTS_ERROR, data };
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
export function getPullRequests(owner, repo, token, state, head, base, sort, direction) {
  params.access_token = token;
  params.base = base;
  params.head = head;
  params.sort = sort;
  params.direction = direction;
  params.state = state;
  const requestUrl = `${baseUrl}/${owner}/${repo}/pulls?${urlEncodeData(params)}`;
  return (dispatch) => {
    dispatch(getPullRequestsStart());
    return httpGetAsync(requestUrl, (response) => {
      const json = JSON.parse(response || []);
      dispatch(getPullRequestsSuccess(json));
    });
  };
}
