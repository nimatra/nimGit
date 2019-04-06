import React, { Component } from 'react';
import { connect } from 'react-redux';
import { } from 'material-ui';
import PullRequestItem from '../Issue/Item';
import { pullRequestListSelector } from '../../selectors/pullRequest';

const listStyle = { margin: '25px 10px 5px 10px' };
class Page extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      editing: false,
    };
  }

  render() {
    const { pullRequestList, actions } = this.props;
    let items = (null);

    if (pullRequestList) {
      items = pullRequestList.map(item => (
        <PullRequestItem
          key={item.id}
          user={item.user}
          title={item.title}
          body={item.body}
          html_url={item.html_url}
        />
));
    }
    return (
      <div style={listStyle}>
        { items }
      </div>
);
  }
}

const mapStateToProps = state => ({
  pullRequestList: pullRequestListSelector(state),
});

const PullRequestComponent = connect(
  mapStateToProps
)(Page);

export default PullRequestComponent;
