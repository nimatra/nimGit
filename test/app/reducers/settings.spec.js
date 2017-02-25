import { expect } from 'chai';
import * as types from '../../../app/constants/ActionTypes';
import settings from '../../../app/reducers/settings';
import { user, repo } from '../testData';

const initialState = {
  activeRepo: {},
  repos: [],
  token: '',
  user: {},
  username: '',
  isDarkThemeOn: false,
};

describe('githubExtension settings reducer', () => {
  it('should handle initial state', () => {
    expect(
      settings(undefined, {})
    ).to.eql([...initialState]);
  });

  it('should handle SET_TOKEN', () => {
    expect(
      settings([], {
        type: types.SET_TOKEN,
        data: 'token 1',
      })
    ).to.eql([Object.assign({}, initialState, { token: 'token 1' })]);
    expect(
      settings([], {
        type: types.SET_TOKEN,
        data: 'token 2',
      })
    ).to.eql([Object.assign({}, initialState, { token: 'token 2' })]);
    expect(
      settings([], {
        type: types.SET_TOKEN,
        data: '',
      })
    ).to.eql([Object.assign({}, initialState, { token: '' })]);
  });

  it('should handle SET_USER', () => {
    expect(
      settings([], {
        type: types.SET_USER,
        data: user,
      })
    ).to.eql([Object.assign({}, initialState, { user })]);
    expect(
      settings([], {
        type: types.SET_USER,
        data: {},
      })
    ).to.eql([Object.assign({}, initialState, { user: {} })]);
  });

  it('should handle SET_USERNAME', () => {
    expect(
      settings([], {
        type: types.SET_USERNAME,
        data: user.login,
      })
    ).to.eql([Object.assign({}, initialState, { username: user.login })]);
    expect(
      settings([], {
        type: types.SET_USERNAME,
        data: '',
      })
    ).to.eql([Object.assign({}, initialState, { username: '' })]);
  });

  it('should handle ADD_REPO', () => {
    expect(
      settings([], {
        type: types.ADD_REPO,
        data: repo,
      })
    ).to.eql([Object.assign({}, initialState, { repos: [repo] })]);
    expect(
      settings([], {
        type: types.ADD_REPO,
        data: {},
      })
    ).to.eql([Object.assign({}, initialState, { repos: [] })]);
  });

  it('should handle SET_ACTIVE_REPO', () => {
    expect(
      settings([], {
        type: types.SET_ACTIVE_REPO,
        data: repo,
      })
    ).to.eql([Object.assign({}, initialState, { activeRepo: repo })]);
    expect(
      settings([], {
        type: types.SET_ACTIVE_REPO,
        data: {},
      })
    ).to.eql([Object.assign({}, initialState, { activeRepo: {} })]);
  });

  it('should handle SET_DARK_THEME', () => {
    expect(
      settings([], {
        type: types.SET_DARK_THEME,
        data: true,
      })
    ).to.eql([Object.assign({}, initialState, { isDarkThemeOn: true })]);
    expect(
      settings([], {
        type: types.SET_ACTIVE_REPO,
        data: false,
      })
    ).to.eql([Object.assign({}, initialState, { isDarkThemeOn: false })]);
  });
});
