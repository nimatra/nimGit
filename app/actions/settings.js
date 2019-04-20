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

export function addOwner(data) {
  return { type: types.ADD_OWNER, data };
}

export function removeOwner(data) {
  return { type: types.REMOVE_OWNER, data };
}

export function addRepo(data) {
  return { type: types.ADD_REPO, data };
}

export function removeRepo(data) {
  return { type: types.REMOVE_REPO, data };
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
 * @export
 * @param {string} token
 * @param {string} username
 * @param {string} owner
 * @returns
 */
export function getOwner(token, username, owner) {
  params.access_token = token;
  const requestUrl = `${baseUrl}/orgs/${owner}/memberships/${username}?${urlEncodeData(params)}`;
  return dispatch => httpGetAsync(requestUrl, (response) => {
    const json = JSON.parse(response || []);
    dispatch(addOwner(json.organization));
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
    }
    dispatch(setIsRepoValid(isRepoValid));
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
export function getOrgRepos(token, owner) {
  params.access_token = token;
  const requestUrl = `${baseUrl}/orgs/${owner}/repos?${urlEncodeData(params)}`;
  return dispatch => httpGetAsync(requestUrl, (response) => {
    const json = JSON.parse(response || []);
    const isRepoValid = !!json;
    if (isRepoValid) {
      json.every(repo => dispatch(addRepo(repo)));
    }
    dispatch(setIsRepoValid(isRepoValid));
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
export function getUserRepos(token, username) {
  params.access_token = token;
  const requestUrl = `${baseUrl}/users/${username}/repos?${urlEncodeData(params)}`;
  return dispatch => httpGetAsync(requestUrl, (response) => {
    const json = JSON.parse(response || []);
    const isRepoValid = !!json;
    if (isRepoValid) {
      json.every(repository => dispatch(addRepo(repository)));
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
export function validateSettings(token, username, repo, owners) {
  return (dispatch) => {
    owners.every((owner) => {
      dispatch(getOwner(token, username, owner));
      dispatch(getOrgRepos(token, owner));
    });
    dispatch(getUser(token, username));
    dispatch(getUserRepos(token, username));
    dispatch(setToken(token));
  };
}
