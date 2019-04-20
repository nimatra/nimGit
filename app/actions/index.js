import * as pullRequestActions from './pullRequest';
import * as notificationActions from './notification';
import * as settings from './settings';
import * as navigation from './navigation';
import * as issue from './issue';
import * as repo from './repo';

const combined = {
  ...pullRequestActions,
  ...notificationActions,
  ...settings,
  ...navigation,
  ...issue,
  ...repo,
};
export default combined;
