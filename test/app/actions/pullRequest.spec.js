import { expect } from 'chai';
import * as types from '../../../app/constants/ActionTypes';
import * as actions from '../../../app/actions/pullRequest';

describe('githubExtension Pull Request actions', () => {
  it('getPullRequestsError should create GET_PULL_REQUESTS_ERROR action', () => {
    expect(actions.getPullRequestsError('data')).to.eql({
      type: types.GET_PULL_REQUESTS_ERROR,
      data: 'data',
    });
  });
  it('getPullRequestsSuccess should create GET_PULL_REQUESTS_SUCCESS action', () => {
    expect(actions.getPullRequestsSuccess('data')).to.eql({
      type: types.GET_PULL_REQUESTS_SUCCESS,
      data: 'data',
    });
  });
  it('getPullRequestsStart should create GET_PULL_REQUESTS_START action', () => {
    expect(actions.getPullRequestsStart('data')).to.eql({
      type: types.GET_PULL_REQUESTS_START,
      data: 'data',
    });
  });
});
