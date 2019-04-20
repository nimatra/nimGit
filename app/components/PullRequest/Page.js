import React, { Component } from 'react';
import { connect } from 'react-redux';
import { } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
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
    let items = (
      <Typography
        variant="subtitle1"
        gutterBottom
        style={{
          'margin-top': '25%',
          'text-align': 'center',
        }}
      >
Select a repo to view its active pull requests

      </Typography>
    );

    if (pullRequestList && pullRequestList.length) {
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
