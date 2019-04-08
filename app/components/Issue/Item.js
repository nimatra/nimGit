import React, { Component } from 'react';
import {
  Avatar, Card, CardHeader,
} from '@material-ui/core';
import Link from '@material-ui/core/Link';

export default class Item extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      editing: false,
    };
  }

  handleClick = () => {
    const { html_url } = this.props;
    chrome.tabs.create({ url: html_url });
  };

  render() {
    const { user, title, body } = this.props;
    return (
      <Card style={{ paddingLeft: '10px', paddingRight: '20px' }}>
        <CardHeader
          avatar={<Avatar src={user.avatar_url} size={30} alt="" />}
          title={user.login}
          subheader={title}
          action={(
            <Link
              onClick={this.handleClick}
              component="button"
              variant="body2"
            >
              {(body && `${body.substring(0, 20)}..`) || 'Click to open'}
            </Link>
          )}
        />
      </Card>
    );
  }
}
