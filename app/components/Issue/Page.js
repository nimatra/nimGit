import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';
import { Card, CardHeader, Divider } from 'material-ui';
import IssueItem from './Item';
import {
    assignedIssueListSelector,
    createdIssueListSelector,
    mentionedIssueListSelector,
    subscribedIssueListSelector,
    allIssueListSelector,
 } from '../../selectors/issue';

const listStyle = { 'margin-top': '25px' };

const listItemStyle = { background: 'white', margin: '5px 10px 5px 10px' };
class Page extends Component {
  static propTypes = {
    assignedIssueList: PropTypes.array.isRequired,
    createdIssueList: PropTypes.array.isRequired,
    mentionedIssueList: PropTypes.array.isRequired,
    subscribedIssueList: PropTypes.array.isRequired,
    allIssueList: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired,
  };

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
        allIssueList } = this.props;

    const assignedItems = assignedIssueList ? assignedIssueList.map(item => (
      <IssueItem
        key={item.id}
        user={item.user}
        title={item.title}
        body={item.body}
        html_url={item.html_url}
      />))
        : (null);

    const createdItems = createdIssueList ? createdIssueList.map(item => (
      <IssueItem
        key={item.id}
        user={item.user}
        title={item.title}
        body={item.body}
        html_url={item.html_url}
      />))
        : (null);

    const mentionedItems = mentionedIssueList ? mentionedIssueList.map(item => (
      <IssueItem
        key={item.id}
        user={item.user}
        title={item.title}
        body={item.body}
        html_url={item.html_url}
      />))
        : (null);

    const subscribedItems = subscribedIssueList ? subscribedIssueList.map(item => (
      <IssueItem
        key={item.id}
        user={item.user}
        title={item.title}
        body={item.body}
        html_url={item.html_url}
      />))
        : (null);

    const allItems = allIssueList ? allIssueList.map(item => (
      <IssueItem
        key={item.id}
        user={item.user}
        title={item.title}
        body={item.body}
        html_url={item.html_url}
      />))
        : (null);

    return (
      <div style={listStyle}>
        {!isEmpty(assignedIssueList) && <Card style={listItemStyle}>
          <CardHeader
            title="ASSIGNED"
          />
          {assignedItems}
        </Card>}
        <Divider />
        {!isEmpty(createdIssueList) && <Card style={listItemStyle}>
          <CardHeader
            title="CREATED"
          />
          {createdItems}
        </Card>}
        <Divider />
        {!isEmpty(mentionedIssueList) && <Card style={listItemStyle}>
          <CardHeader
            title="MENTIONED"
          />
          {mentionedItems}
        </Card>}
        <Divider />
        {!isEmpty(subscribedIssueList) && <Card style={listItemStyle}>
          <CardHeader
            title="SUBSRIBED"
          />
          {subscribedItems}
        </Card>}
        <Divider />
        {!isEmpty(allIssueList) && <Card style={listItemStyle}>
          <CardHeader
            title="ALL"
          />
          {allItems}
        </Card>}
      </div>);
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
