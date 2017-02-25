import { combineReducers } from 'redux';
import notification from './notification';
import issue from './issue';
import pullRequest from './pullRequest';
import settings from './settings';
import navigation from './navigation';

export default combineReducers({
  navigation,
  notification,
  pullRequest,
  settings,
  issue,
});
