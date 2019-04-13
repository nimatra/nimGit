import * as types from '../constants/ActionTypes';
import { urlEncodeData, httpGetAsync } from '../utils/web';

const baseUrl = 'https://api.github.com';
const params = {
  access_token: {},
};
export function getReposStart(data) {
  return { type: types.GET_REPOS_START, data };
}
export function getReposSuccess(data) {
  return { type: types.GET_REPOS_SUCCESS, data };
}
export function getReposError(data) {
  return { type: types.GET_REPOS_ERROR, data };
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
export function getRepos(owner, token, state) {
  params.access_token = token;
  params.state = state;
  const requestUrl = `${baseUrl}/orgs/${owner}/repos?${urlEncodeData(params)}`;
  return (dispatch) => {
    dispatch(getReposStart());
    return httpGetAsync(requestUrl, (response) => {
      const json = JSON.parse(response || []);
      dispatch(getReposSuccess(json));
    });
  };
}
