import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as pages from '../constants/Pages';
import IssuePage from './Issue/Page';
import PullRequestPage from './PullRequest/Page';
import SettingsPage from './Settings/Page';
import Header from './Header';
import {
  getActiveRepo, tokenSelector, userSelector, reposSelector,
} from '../selectors/settings';

class Router extends Component {
  componentWillMount() {
    const { actions, activeRepo, token } = this.props;
    if (token) {
      actions.getIssues(token);
    }
    if (activeRepo && activeRepo.owner && token) {
      actions.getPullRequests(activeRepo.name, activeRepo.owner.login, token);
      actions.getIssues(activeRepo.name, activeRepo.owner.login, token);
    }
  }

  render() {
    const { navigation, actions, token } = this.props;
    let page = null;
    const defaultPage = token ? pages.PULL_REQUESTS : pages.SETTINGS;
    switch (navigation.activePage || defaultPage) {
      case pages.ISSUES:
        page = (
          <IssuePage
            actions={actions}
          />
        );
        break;
      case pages.PULL_REQUESTS:
        page = (
          <PullRequestPage
            actions={actions}
          />
        );
        break;
      case pages.SETTINGS:
        page = (
          <SettingsPage
            actions={actions}
          />
        );
        break;
      default:
        page = (
          <SettingsPage
            actions={actions}
          />
        );
        break;
    }
    return (
      <div>
        <Header actions={actions} />
        {page}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  activeRepo: getActiveRepo(state),
  token: tokenSelector(state),
  user: userSelector(state),
  repos: reposSelector(state),
});

const RouterComponent = connect(
  mapStateToProps
)(Router);

export default RouterComponent;
