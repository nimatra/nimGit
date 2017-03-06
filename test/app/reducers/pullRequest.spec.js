import { expect } from 'chai';
import * as types from '../../../app/constants/ActionTypes';
import pullRequest from '../../../app/reducers/pullRequest';

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
        data: [1, 2, 3],
      })
    ).to.eql({
      sync: false,
      error: {},
      pullRequestList: [1, 2, 3],
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
