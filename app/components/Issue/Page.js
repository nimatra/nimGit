import React, { Component } from 'react';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';
import {
  Card, CardHeader, Divider, Chip,
} from '@material-ui/core';
import IssueItem from './Item';
import {
  assignedIssueListSelector,
  createdIssueListSelector,
  mentionedIssueListSelector,
  subscribedIssueListSelector,
  allIssueListSelector,
} from '../../selectors/issue';

const headerStyle = {
  margin: '15px',
  left: '40%',
  position: 'relative',
};

const listItemStyle = { background: 'white', margin: '5px 10px 5px 10px' };
class Page extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      editing: false,
    };
  }

  render() {
    const {
      assignedIssueList,
      createdIssueList,
      mentionedIssueList,
      subscribedIssueList,
      allIssueList,
    } = this.props;

    const assignedItems = assignedIssueList ? assignedIssueList.map(item => (
      <IssueItem
        key={item.id}
        user={item.user}
        title={item.title}
        body={item.body}
        html_url={item.html_url}
      />
    ))
      : (null);

    const createdItems = createdIssueList ? createdIssueList.map(item => (
      <IssueItem
        key={item.id}
        user={item.user}
        title={item.title}
        body={item.body}
        html_url={item.html_url}
      />
    ))
      : (null);

    const mentionedItems = mentionedIssueList ? mentionedIssueList.map(item => (
      <IssueItem
        key={item.id}
        user={item.user}
        title={item.title}
        body={item.body}
        html_url={item.html_url}
      />
    ))
      : (null);

    const subscribedItems = subscribedIssueList ? subscribedIssueList.map(item => (
      <IssueItem
        key={item.id}
        user={item.user}
        title={item.title}
        body={item.body}
        html_url={item.html_url}
      />
    ))
      : (null);

    const allItems = allIssueList ? allIssueList.map(item => (
      <IssueItem
        key={item.id}
        user={item.user}
        title={item.title}
        body={item.body}
        html_url={item.html_url}
      />
    ))
      : (null);

    return (
      <div>
        {!isEmpty(assignedIssueList) && (
          <div>
            <Chip
              style={headerStyle}
              label="Assigned"
              color="primary"
              variant="outlined"
            />
            <Card>
              {assignedItems}
            </Card>
          </div>
        )}
        <Divider />
        {!isEmpty(createdIssueList) && (
          <div>
            <Chip
              style={headerStyle}
              label="Created"
              color="primary"
              variant="outlined"
            />
            <Card style={listItemStyle}>
              {createdItems}
            </Card>
          </div>
        )}
        <Divider />
        {!isEmpty(mentionedIssueList) && (
          <div>
            <Chip
              style={headerStyle}
              label="Mentioned"
              color="primary"
              variant="outlined"
            />
            <Card style={listItemStyle}>
              {mentionedItems}
            </Card>
          </div>
        )}
        <Divider />
        {!isEmpty(subscribedIssueList) && (
          <div>
            <Chip
              style={headerStyle}
              label="Mentioned"
              color="primary"
              variant="outlined"
            />
            <Card style={listItemStyle}>
              {subscribedItems}
            </Card>
          </div>
        )}
        <Divider />
        {!isEmpty(allIssueList) && (
          <div>
            <Chip
              style={headerStyle}
              label="All"
              color="primary"
              variant="outlined"
            />
            <Card style={listItemStyle}>
              {allItems}
            </Card>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  assignedIssueList: assignedIssueListSelector(state),
  createdIssueList: createdIssueListSelector(state),
  mentionedIssueList: mentionedIssueListSelector(state),
  subscribedIssueList: subscribedIssueListSelector(state),
  allIssueList: allIssueListSelector(state),
});

const IssueComponent = connect(
  mapStateToProps
)(Page);

export default IssueComponent;
