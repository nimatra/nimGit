import { expect } from 'chai';
import * as types from '../../../app/constants/ActionTypes';
import * as actions from '../../../app/actions/issue';

describe('githubExtension Issue actions', () => {
  it('getIssuesError should create GET_ISSUES_ERROR action', () => {
    expect(actions.getIssuesError('data')).to.eql({
      type: types.GET_ISSUES_ERROR,
      data: 'data',
    });
  });
  it('getAllIssuesSuccess should create GET_ALL_ISSUES_SUCCESS action', () => {
    expect(actions.getAllIssuesSuccess('data')).to.eql({
      type: types.GET_ALL_ISSUES_SUCCESS,
      data: 'data',
    });
  });
  it('getSubscribedIssuesSuccess should create GET_SUBSCRIBED_ISSUES_SUCCESS action', () => {
    expect(actions.getSubscribedIssuesSuccess('data')).to.eql({
      type: types.GET_SUBSCRIBED_ISSUES_SUCCESS,
      data: 'data',
    });
  });
  it('getMentionedIssuesSuccess should create GET_MENTIONED_ISSUES_SUCCESS action', () => {
    expect(actions.getMentionedIssuesSuccess('data')).to.eql({
      type: types.GET_MENTIONED_ISSUES_SUCCESS,
      data: 'data',
    });
  });
  it('getCreatedIssuesSuccess should create GET_CREATED_ISSUES_SUCCESS action', () => {
    expect(actions.getCreatedIssuesSuccess('data')).to.eql({
      type: types.GET_CREATED_ISSUES_SUCCESS,
      data: 'data',
    });
  });
  it('getAssignedIssuesSuccess should create GET_ASSIGNED_ISSUES_SUCCESS action', () => {
    expect(actions.getAssignedIssuesSuccess('data')).to.eql({
      type: types.GET_ASSIGNED_ISSUES_SUCCESS,
      data: 'data',
    });
  });
  it('getIssuesStart should create GET_ISSUES_START action', () => {
    expect(actions.getIssuesStart('data')).to.eql({
      type: types.GET_ISSUES_START,
      data: 'data',
    });
  });
});
