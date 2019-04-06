import React, { Component } from 'react';
import {
  Avatar, Card, CardHeader, CardTitle,
} from 'material-ui';

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
          subtitle={title}
          actAsExpander
          showExpandableButton
        />
        <CardTitle
          subtitle={body}
          expandable
          onClick={this.handleClick}
          style={{
            backgroundColor: '#ECEFF1',
            color: 'black',
            cursor: 'pointer',
            marginLeft: '10px',
            marginRight: '20px',
          }}
        />
      </Card>
    );
  }
}
