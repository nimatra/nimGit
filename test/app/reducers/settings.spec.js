import { expect } from 'chai';
import * as types from '../../../app/constants/ActionTypes';
import settings from '../../../app/reducers/settings';
import { user, repo } from '../testData';

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

describe('githubExtension settings reducer', () => {
  it('should handle initial state', () => {
    expect(
      settings(undefined, {})
    ).to.eql(initialState);
  });

  it('should handle SET_TOKEN', () => {
    expect(
      settings(undefined, {
        type: types.SET_TOKEN,
        data: 'token 1',
      })
    ).to.eql({ ...initialState, token: 'token 1' });
    expect(
      settings(undefined, {
        type: types.SET_TOKEN,
        data: 'token 2',
      })
    ).to.eql({ ...initialState, token: 'token 2' });
    expect(
      settings(undefined, {
        type: types.SET_TOKEN,
        data: {},
      })
    ).to.eql({ ...initialState, token: {} });
  });

  it('should handle SET_USER', () => {
    expect(
      settings(undefined, {
        type: types.SET_USER,
        data: user,
      })
    ).to.eql({ ...initialState, user });
    expect(
      settings(undefined, {
        type: types.SET_USER,
        data: {},
      })
    ).to.eql({ ...initialState, user: {} });
  });

  it('should handle SET_USERNAME', () => {
    expect(
      settings(undefined, {
        type: types.SET_USERNAME,
        data: user.login,
      })
    ).to.eql({ ...initialState, username: user.login });
    expect(
      settings(undefined, {
        type: types.SET_USERNAME,
        data: {},
      })
    ).to.eql({ ...initialState, username: {} });
  });

  it('should handle ADD_OWNER', () => {
    expect(
      settings(undefined, {
        type: types.ADD_OWNER,
        data: repo,
      })
    ).to.eql({ ...initialState, repos: [repo] });
    expect(
      settings(undefined, {
        type: types.ADD_OWNER,
        data: {},
      })
    ).to.eql({ ...initialState, repos: [] });
  });

  it('should handle REMOVE_OWNER', () => {
    expect(
      settings({ ...initialState, repos: [repo] }, {
        type: types.REMOVE_OWNER,
        data: repo,
      })
    ).to.eql({ ...initialState, repos: [] });
    expect(
      settings(undefined, {
        type: types.REMOVE_OWNER,
        data: {},
      })
    ).to.eql({ ...initialState, repos: [] });
  });

  it('should handle SET_ACTIVE_REPO', () => {
    expect(
      settings(undefined, {
        type: types.SET_ACTIVE_REPO,
        data: repo,
      })
    ).to.eql({ ...initialState, activeRepo: repo });
    expect(
      settings(undefined, {
        type: types.SET_ACTIVE_REPO,
        data: {},
      })
    ).to.eql({ ...initialState, activeRepo: {} });
  });

  it('should handle SET_DARK_THEME', () => {
    expect(
      settings(undefined, {
        type: types.SET_DARK_THEME,
        data: true,
      })
    ).to.eql({ ...initialState, isDarkThemeOn: true });
    expect(
      settings(undefined, {
        type: types.SET_DARK_THEME,
        data: false,
      })
    ).to.eql({ ...initialState, isDarkThemeOn: false });
  });
});
