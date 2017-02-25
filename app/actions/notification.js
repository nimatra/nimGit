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
    // return axios({
    //   requestUrl,
    //   timeout: 20000,
    //   method: 'get',
    //   responseType: 'json',
    //   headers: {
    //     'Access-Control-Allow-Origin': '*',
    //   },
    // }).then((response) => {
    //   dispatch(getNotificationsSuccess(response.data));
    //   console.log(response.data);
    // }).catch((response) => {
    //   dispatch(getNotificationsError(response.data));
    //   console.log(response.data);
    // });
  };
  // return dispatch => dispatch(getNotificationsSuccess([
  //   {
  //     id: '1',
  //     subject: {
  //       title: 'Greetings',
  //       url: 'https://api.github.com/repos/octokit/octokit.rb/issues/123',
  //       latest_comment_url: 'https://api.github.com/repos/octokit/octokit.rb/issues/comments/123',
  //       type: 'Issue',
  //     },
  //     reason: 'subscribed',
  //     unread: true,
  //     updated_at: '2014-11-07T22:01:45Z',
  //     last_read_at: '2014-11-07T22:01:45Z',
  //     url: 'https://api.github.com/notifications/threads/1',
  //   },
  //   {
  //     id: '2',
  //     subject: {
  //       title: 'Hola',
  //       url: 'https://api.github.com/repos/octokit/octokit.rb/issues/123',
  //       latest_comment_url: 'https://api.github.com/repos/octokit/octokit.rb/issues/comments/123',
  //       type: 'Issue',
  //     },
  //     reason: 'subscribed',
  //     unread: true,
  //     updated_at: '2014-11-07T22:01:45Z',
  //     last_read_at: '2014-11-07T22:01:45Z',
  //     url: 'https://api.github.com/notifications/threads/1',
  //   },
  //   {
  //     id: '3',
  //     subject: {
  //       title: 'Hey',
  //       url: 'https://api.github.com/repos/octokit/octokit.rb/issues/123',
  //       latest_comment_url: 'https://api.github.com/repos/octokit/octokit.rb/issues/comments/123',
  //       type: 'Issue',
  //     },
  //     reason: 'subscribed',
  //     unread: true,
  //     updated_at: '2014-11-07T22:01:45Z',
  //     last_read_at: '2014-11-07T22:01:45Z',
  //     url: 'https://api.github.com/notifications/threads/1',
  //   },
  // ]));
}
