import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { List, Divider } from 'material-ui';
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
        { assignedItems }
        <Divider />
        { createdItems }
        <Divider />
        { mentionedItems }
        <Divider />
        { subscribedItems }
        <Divider />
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
