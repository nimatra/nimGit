import { expect } from 'chai';
import * as types from '../../../app/constants/ActionTypes';
import notification from '../../../app/reducers/notification';

describe('githubExtension notification reducer', () => {
  it('should handle initial state', () => {
    expect(
      notification(undefined, {})
    ).to.eql([{
      sync: false,
      error: '',
      notificationList: [],
    }]);
  });

  it('should handle GET_NOTIFICATIONS_START', () => {
    expect(
      notification([], {
        type: types.GET_NOTIFICATIONS_START,
      })
    ).to.eql([{
      sync: true,
      error: '',
      notificationList: [],
    }]);
  });

  it('should handle GET_NOTIFICATIONS_SUCCESS', () => {
    expect(
      notification([], {
        type: types.GET_NOTIFICATIONS_SUCCESS,
        data: [1, 2, 3],
      })
    ).to.eql([{
      sync: false,
      error: '',
      notificationList: [1, 2, 3],
    }]);
  });

  it('should handle GET_NOTIFICATIONS_ERROR', () => {
    expect(
      notification([], {
        type: types.GET_NOTIFICATIONS_ERROR,
        data: 'error',
      })
    ).to.eql([{
      sync: false,
      error: 'error',
      notificationList: [],
    }]);
  });
});
