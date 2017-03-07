import { expect } from 'chai';
import * as types from '../../../app/constants/ActionTypes';
import issue from '../../../app/reducers/issue';
import { issue as sampleIssue } from '../testData';

describe('githubExtension issues reducer', () => {
  it('should handle initial state', () => {
    expect(
      issue(undefined, {})
    ).to.eql({
      sync: false,
      error: {},
      assignedIssueList: [],
      createdIssueList: [],
      mentionedIssueList: [],
      subscribedIssueList: [],
      allIssueList: [],
    });
  });

  it('should handle GET_ISSUES_START', () => {
    expect(
      issue([], {
        type: types.GET_ISSUES_START,
      })
    ).to.eql({
      sync: true,
      error: {},
      assignedIssueList: [],
      createdIssueList: [],
      mentionedIssueList: [],
      subscribedIssueList: [],
      allIssueList: [],
    });
  });

  it('should handle GET_ASSIGNED_ISSUES_SUCCESS', () => {
    expect(
      issue([], {
        type: types.GET_ASSIGNED_ISSUES_SUCCESS,
        data: [sampleIssue],
      })
    ).to.eql({
      sync: false,
      error: {},
      assignedIssueList: [sampleIssue],
    });
  });
  it('should handle GET_CREATED_ISSUES_SUCCESS', () => {
    expect(
      issue([], {
        type: types.GET_CREATED_ISSUES_SUCCESS,
        data: [sampleIssue],
      })
    ).to.eql({
      sync: false,
      error: {},
      createdIssueList: [sampleIssue],
    });
  });
  it('should handle GET_MENTIONED_ISSUES_SUCCESS', () => {
    expect(
      issue([], {
        type: types.GET_MENTIONED_ISSUES_SUCCESS,
        data: [sampleIssue],
      })
    ).to.eql({
      sync: false,
      error: {},
      mentionedIssueList: [sampleIssue],
    });
  });
  it('should handle GET_SUBSCRIBED_ISSUES_SUCCESS', () => {
    expect(
      issue([], {
        type: types.GET_SUBSCRIBED_ISSUES_SUCCESS,
        data: [sampleIssue],
      })
    ).to.eql({
      sync: false,
      error: {},
      subscribedIssueList: [sampleIssue],
    });
  });
  it('should handle GET_ALL_ISSUES_SUCCESS', () => {
    expect(
      issue([], {
        type: types.GET_ALL_ISSUES_SUCCESS,
        data: [sampleIssue],
      })
    ).to.eql({
      sync: false,
      error: {},
      allIssueList: [sampleIssue],
    });
  });

  it('should handle GET_ISSUES_ERROR', () => {
    expect(
      issue([], {
        type: types.GET_ISSUES_ERROR,
        data: 'error',
      })
    ).to.eql({
      sync: false,
      error: 'error',
    });
  });
});
