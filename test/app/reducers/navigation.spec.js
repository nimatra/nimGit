import { expect } from 'chai';
import * as types from '../../../app/constants/ActionTypes';
import navigation from '../../../app/reducers/navigation';
import * as Pages from '../../../app/constants/Pages';

describe('githubExtension navigation reducer', () => {
  it('should handle initial state', () => {
    expect(
      navigation(undefined, {})
    ).to.eql([{
      activePage: Pages.SETTINGS,
    }]);
  });

  it('should handle NAVIGATE_TO', () => {
    expect(
      navigation([], {
        type: types.NAVIGATE_TO,
        data: Pages.NOTIFICATIONS,
      })
    ).to.eql([{
      activePage: Pages.NOTIFICATIONS,
    }]);
    expect(
      navigation([], {
        type: types.NAVIGATE_TO,
        data: Pages.PULL_REQUESTS,
      })
    ).to.eql([{
      activePage: Pages.PULL_REQUESTS,
    }]);
    expect(
      navigation([], {
        type: types.NAVIGATE_TO,
        data: Pages.SETTINGS,
      })
    ).to.eql([{
      activePage: Pages.SETTINGS,
    }]);
  });
});
