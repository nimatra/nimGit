import * as pullRequestActions from '../actions/pullRequest';
import * as notificationActions from '../actions/notification';
import * as settings from '../actions/settings';
import * as navigation from '../actions/navigation';
import * as issue from '../actions/issue';

const combined = {
  ...pullRequestActions,
  ...notificationActions,
  ...settings,
  ...navigation,
  ...issue };
export default combined;
