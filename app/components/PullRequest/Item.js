import React, { Component, PropTypes } from 'react';
import { ListItem, Avatar, FileFolder, ActionInfo } from 'material-ui';

export default class Item extends Component {

  static propTypes = {
    pullRequest: PropTypes.object.isRequired,
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      editing: false,
    };
  }

  handleClick = () => {
    const { pullRequest } = this.props;
    chrome.tabs.create({ url: pullRequest.html_url });
  };

  render() {
    const { pullRequest } = this.props;
    if (!pullRequest) {
      return (<div />);
    }
    return (
      <ListItem
        leftAvatar={<Avatar src={pullRequest.user.avatar_url} size={30} alt="" />}
        primaryText={pullRequest.user.login}
        secondaryText={pullRequest.title}
        onClick={this.handleClick}
      />
    );
  }
}
