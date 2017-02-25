import { expect } from 'chai';
import * as types from '../../../app/constants/ActionTypes';
import * as actions from '../../../app/actions/notification';

describe('githubExtension Notification actions', () => {
  it('getNotificationsError should create GET_NOTIFICATIONS_ERROR action', () => {
    expect(actions.getNotificationsError('data')).to.eql({
      type: types.GET_NOTIFICATIONS_ERROR,
      data: 'data',
    });
  });
  it('getNotificationsSuccess should create GET_NOTIFICATIONS_SUCCESS action', () => {
    expect(actions.getNotificationsSuccess('data')).to.eql({
      type: types.GET_NOTIFICATIONS_SUCCESS,
      data: 'data',
    });
  });
  it('getNotificationsStart should create GET_NOTIFICATIONS_START action', () => {
    expect(actions.getNotificationsStart('data')).to.eql({
      type: types.GET_NOTIFICATIONS_START,
      data: 'data',
    });
  });
});
