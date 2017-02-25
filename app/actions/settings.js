import * as types from '../constants/ActionTypes';
import { urlEncodeData, httpGetAsync } from '../utils/web';

const baseUrl = 'https://api.github.com';
const params = {
  state: '',
  head: '',
  base: '',
  sort: '',
  direction: '',
  access_token: {},
};

export function setToken(data) {
  return { type: types.SET_TOKEN, data };
}

export function setUsername(data) {
  return { type: types.SET_USERNAME, data };
}

export function setUser(data) {
  return { type: types.SET_USER, data };
}

export function addRepo(data) {
  return { type: types.ADD_REPO, data };
}

export function setActiveRepo(data) {
  return { type: types.SET_ACTIVE_REPO, data };
}

export function setDarkTheme(data) {
  return { type: types.SET_DARK_THEME, data };
}

export function setIsUserValid(data) {
  return { type: types.SET_IS_USER_VALID, data };
}

export function setIsTokenValid(data) {
  return { type: types.SET_IS_TOKEN_VALID, data };
}

export function setIsRepoValid(data) {
  return { type: types.SET_IS_REPO_VALID, data };
}

/**
 *
 * @export
 * @param {string} token
 * @param {string} username
 * @returns
 */
export function getUser(token, username) {
  params.access_token = token;
  const requestUrl = `${baseUrl}/users/${username}?${urlEncodeData(params)}`;
  return dispatch => httpGetAsync(requestUrl, (response) => {
    const json = JSON.parse(response || []);
    const isUserValid = true;
    if (isUserValid) {
      dispatch(setUser(json));
      dispatch(setUsername(username));
    }
    dispatch(setIsUserValid(isUserValid));
  });
}

/**
 *
 *
 * @export
 * @param {any} token
 * @param {any} repo
 * @param {any} owner
 * @returns
 */
export function getRepo(token, repo, owner) {
  params.access_token = token;
  const requestUrl = `${baseUrl}/repos/${owner}/${repo}?${urlEncodeData(params)}`;
  return dispatch => httpGetAsync(requestUrl, (response) => {
    const json = JSON.parse(response || []);
    const isRepoValid = true;
    if (isRepoValid) {
      dispatch(addRepo(json));
      dispatch(setActiveRepo(json));
    }
    dispatch(setIsRepoValid(isRepoValid));
  });
}

/**
 *
 *
 * @export
 * @param {any} token
 * @param {any} username
 * @param {any} repo
 * @param {any} owner
 */
export function validateSettings(token, username, repo, owner) {
  return (dispatch) => {
    dispatch(getUser(token, username));
    dispatch(getRepo(token, repo, owner));
    dispatch(setToken(token));
  };
}
