import { expect } from 'chai';
import * as types from '../../../app/constants/ActionTypes';
import * as actions from '../../../app/actions/navigation';

describe('githubExtension Navigation actions', () => {
  it('navigateTo should create NAVIGATE_TO action', () => {
    expect(actions.navigateTo('data')).to.eql({
      type: types.NAVIGATE_TO,
      data: 'data',
    });
  });
});
