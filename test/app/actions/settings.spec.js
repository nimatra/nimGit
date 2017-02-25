import { expect } from 'chai';
import * as types from '../../../app/constants/ActionTypes';
import * as actions from '../../../app/actions/settings';
import { user, repo } from '../testData';


describe('githubExtension settings actions', () => {
  it('setToken should create SET_TOKEN action', () => {
    expect(actions.setToken('My Token')).to.eql({
      type: types.SET_TOKEN,
      data: 'My Token',
    });
  });
  it('setUser should create SET_USER action', () => {
    expect(actions.setUser(user)).to.eql({
      type: types.SET_USER,
      data: user,
    });
  });
  it('setUsername should create SET_USERNAME action', () => {
    expect(actions.setToken(user.login)).to.eql({
      type: types.SET_USERNAME,
      data: user.login,
    });
  });
  it('setActiveRepo should create SET_ACTIVE_REPO action', () => {
    expect(actions.setActiveRepo(repo)).to.eql({
      type: types.SET_ACTIVE_REPO,
      data: repo,
    });
  });
  it('addRepo should create ADD_REPO action', () => {
    expect(actions.addRepo(repo)).to.eql({
      type: types.ADD_REPO,
      data: repo,
    });
  });
});
