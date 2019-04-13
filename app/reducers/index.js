import { combineReducers } from 'redux';
import notification from './notification';
import issue from './issue';
import pullRequest from './pullRequest';
import settings from './settings';
import navigation from './navigation';
import repo from './repo';

export default combineReducers({
  navigation,
  notification,
  pullRequest,
  settings,
  issue,
  repo,
});
