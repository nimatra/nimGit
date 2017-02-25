import * as types from '../constants/ActionTypes';

export function navigateTo(data) {
  return { type: types.NAVIGATE_TO, data };
}
