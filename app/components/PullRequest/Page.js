import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { MobileTearSheet, List, Divider, ListItem } from 'material-ui';
import PullRequestItem from './Item';
import { pullRequestListSelector } from '../../selectors/pullRequest';

class Page extends Component {
  static propTypes = {
    pullRequestList: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      editing: false,
    };
  }

  render() {
    const { pullRequestList, actions } = this.props;
    let items = (<ListItem />);

    if (pullRequestList) {
      items = pullRequestList.map(item => (
        <PullRequestItem
          key={item.id}
          pullRequest={item}
        />));
    }
    return (
      <List>
        { items }
      </List>);
  }
}

const mapStateToProps = state => ({
  pullRequestList: pullRequestListSelector(state),
});

const PullRequestComponent = connect(
  mapStateToProps
)(Page);

export default PullRequestComponent;
