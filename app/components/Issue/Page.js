import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { List, ListItem, Divider, FontIcon } from 'material-ui';
import IssueItem from './Item';
import {
    assignedIssueListSelector,
    createdIssueListSelector,
    mentionedIssueListSelector,
    subscribedIssueListSelector,
    allIssueListSelector,
 } from '../../selectors/issue';

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
        allIssueList,
        actions } = this.props;

    const assignedItems = assignedIssueList ? assignedIssueList.map(item => (
      <IssueItem
        key={item.id}
        issue={item}
      />))
        : (<div />);

    const createdItems = createdIssueList ? createdIssueList.map(item => (
      <IssueItem
        key={item.id}
        issue={item}
      />))
        : (<div />);

    const mentionedItems = mentionedIssueList ? mentionedIssueList.map(item => (
      <IssueItem
        key={item.id}
        issue={item}
      />))
        : (<div />);

    const subscribedItems = subscribedIssueList ? subscribedIssueList.map(item => (
      <IssueItem
        key={item.id}
        issue={item}
      />))
        : (<div />);

    const allItems = allIssueList ? allIssueList.map(item => (
      <IssueItem
        key={item.id}
        issue={item}
      />))
        : (<div />);

    return (
      <List>
        <ListItem
          initiallyOpen
          leftAvatar={(<FontIcon className="muidocs-icon-action-assignment" />)}
          primaryText="ASSIGNED"
          primaryTogglesNestedList
          nestedItems={assignedItems}
        />
        <Divider />
        <ListItem
          initiallyOpen
          leftAvatar={(<FontIcon className="muidocs-icon-action-create" />)}
          primaryText="CREATED"
          primaryTogglesNestedList
          nestedItems={createdItems}
        />
        <Divider />
        <ListItem
          initiallyOpen
          leftAvatar={(<FontIcon className="muidocs-icon-action-assignment-ind" />)}
          primaryText="MENTIONED"
          primaryTogglesNestedList
          nestedItems={mentionedItems}
        />
        <Divider />
        <ListItem
          initiallyOpen
          leftAvatar={(<FontIcon className="muidocs-icon-action-power" />)}
          primaryText="SUBSRIBED"
          primaryTogglesNestedList
          nestedItems={subscribedItems}
        />
        <Divider />
        <ListItem
          primaryText="ALL"
          leftAvatar={(<FontIcon className="muidocs-icon-content-select-all" />)}
          primaryTogglesNestedList
          nestedItems={allItems}
        />
      </List>);
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