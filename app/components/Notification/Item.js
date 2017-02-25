import React, { Component, PropTypes } from 'react';

export default class Item extends Component {

  static propTypes = {
    notification: PropTypes.object.isRequired,
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      editing: false,
    };
  }

  handleClick = () => {
    const { notification } = this.props;
    chrome.tabs.create({ url: notification.subject.url });
  };

  render() {
    const { notification } = this.props;
    if (!notification || !notification.subject) {
      return (<div />);
    }
    const element = (
      <button className={style.view}>
        <label onClick={this.handleClick}>
          {notification.subject.title}
        </label>
      </button>
      );

    return (
      <li>
        {element}
      </li>
    );
  }
}
