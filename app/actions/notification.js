import * as types from '../constants/ActionTypes';
import { urlEncodeData, httpGetAsync } from '../utils/web';

const baseUrl = 'https://api.github.com/notifications';
const params = {
  participating: true,
  access_token: {},
};
export function getNotificationsStart(data) {
  return { type: types.GET_NOTIFICATIONS_START, data };
}
export function getNotificationsSuccess(data) {
  return { type: types.GET_NOTIFICATIONS_SUCCESS, data };
}
export function getNotificationsError(data) {
  return { type: types.GET_NOTIFICATIONS_ERROR, data };
}

export function getNotifications(accessToken) {
  params.access_token = accessToken;
  const requestUrl = `${baseUrl}?${urlEncodeData(params)}`;
  return (dispatch) => {
    dispatch(getNotificationsStart());
    return httpGetAsync(requestUrl, (response) => {
      const json = JSON.parse(response || []);
      dispatch(getNotificationsSuccess(json));
    });
  };
}
