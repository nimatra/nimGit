import React, { Component } from 'react';
import { connect } from 'react-redux';
import { } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import RepoSelect from '../RepoSelect';
import PullRequestItem from '../Issue/Item';
import { pullRequestListSelector } from '../../selectors/pullRequest';
import {
  getActiveRepo, tokenSelector, userSelector, reposSelector, getRepo,
} from '../../selectors/settings';

const formStyle = {
  display: 'flex',
  padding: '0 10px 10px',
};
const listStyle = { margin: '25px 10px 5px 10px' };
class Page extends Component {
  constructor(props, context) {
    super(props, context);
    const { activeRepo } = props;
    this.state = { selectedRepo: activeRepo.name };
  }

  handleChange = (repo) => {
    const { actions } = this.props;
    actions.setActiveRepo(repo.value);
    this.setState({ selectedRepo: repo.value });
    this.refreshData(repo.value);
  };

  refreshData(activeRepo) {
    const {
      actions, token, getRepo,
    } = this.props;
    if (token) {
      actions.getIssues(token);
    }
    const repo = getRepo(activeRepo);
    if (repo && repo.owner) {
      actions.getPullRequests(repo.name, repo.owner.login, token);
    }
  }

  render() {
    const { pullRequestList, repos } = this.props;
    const { selectedRepo } = this.state;
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
        <FormControl style={formStyle} key="Repo-Selector">
          <RepoSelect
            suggestions={repos.map(repo => ({ label: repo.name, value: repo.name }))}
            selectRepo={this.handleChange}
            activeRepo={selectedRepo}
          />
        </FormControl>
        { items }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  pullRequestList: pullRequestListSelector(state),
  repos: reposSelector(state),
  activeRepo: getActiveRepo(state),
  token: tokenSelector(state),
  user: userSelector(state),
  getRepo: getRepo(state),
});

const PullRequestComponent = connect(
  mapStateToProps
)(Page);

export default PullRequestComponent;
