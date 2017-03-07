import { expect } from 'chai';
import * as types from '../../../app/constants/ActionTypes';
import pullRequest from '../../../app/reducers/pullRequest';
import { pullRequest as samplePullRequest } from '../testData';

describe('githubExtension pull requests reducer', () => {
  it('should handle initial state', () => {
    expect(
      pullRequest(undefined, {})
    ).to.eql({
      sync: false,
      error: {},
      pullRequestList: [],
    });
  });

  it('should handle GET_PULL_REQUESTS_START', () => {
    expect(
      pullRequest([], {
        type: types.GET_PULL_REQUESTS_START,
      })
    ).to.eql({
      sync: true,
      error: {},
      pullRequestList: [],
    });
  });

  it('should handle GET_PULL_REQUESTS_SUCCESS', () => {
    expect(
      pullRequest([], {
        type: types.GET_PULL_REQUESTS_SUCCESS,
        data: [samplePullRequest],
      })
    ).to.eql({
      sync: false,
      error: {},
      pullRequestList: [samplePullRequest],
    });
  });

  it('should handle GET_PULL_REQUESTS_ERROR', () => {
    expect(
      pullRequest([], {
        type: types.GET_PULL_REQUESTS_ERROR,
        data: 'error',
      })
    ).to.eql({
      sync: false,
      error: 'error',
      pullRequestList: [],
    });
  });
});
