import React, { Component, PropTypes } from 'react';
import NotificationItem from './Item';
import { SHOW_ALL, SHOW_UNREAD } from '../../constants/NotificationFilters';

const NOTIFICATION_FILTERS = {
  [SHOW_ALL]: () => true,
  [SHOW_UNREAD]: notification => notification.unread,
};

export default class Page extends Component {

  static propTypes = {
    notification: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      editing: false,
    };
  }

  render() {
    const { notification, actions } = this.props;
    const list = notification.notificationList || [];
    const filteredNotifications = list.filter(NOTIFICATION_FILTERS[SHOW_ALL]);
    const readCount = notification.notificationList.reduce(
      (count, item) => (item.completed ? count + 1 : count),
      0
    );
    if (!notification || !notification.subject) {
      return (<div />);
    }

    return (
      <ul >
        {filteredNotifications.map((item) => {
          return (<NotificationItem
            key={item.id}
            notification={item}
          />);
        }
          )}
      </ul>
    );
  }
}
