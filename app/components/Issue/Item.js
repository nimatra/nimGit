import React, { Component, PropTypes } from 'react';
import { ListItem, Avatar, FileFolder, ActionInfo } from 'material-ui';

export default class Item extends Component {

  static propTypes = {
    issue: PropTypes.object.isRequired,
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      editing: false,
    };
  }

  handleClick = () => {
    const { issue } = this.props;
    chrome.tabs.create({ url: issue.html_url });
  };

  render() {
    const { issue } = this.props;
    if (!issue) {
      return (<div />);
    }
    return (
      <ListItem
        leftAvatar={<Avatar src={issue.user.avatar_url} size={30} alt="" />}
        primaryText={issue.user.login}
        secondaryText={issue.title}
        onClick={this.handleClick}
      />
    );
  }
}
