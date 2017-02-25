import React, { Component, PropTypes } from 'react';
import * as pages from '../constants/Pages';
import IssuePage from './Issue/Page';
import PullRequestPage from './PullRequest/Page';
import SettingsPage from './Settings/Page';
import Header from './Header';

export default class Router extends Component {

  static propTypes = {
    navigation: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  render() {
    const { navigation, actions } = this.props;
    let page = null;
    switch (navigation.activePage) {
      case pages.ISSUES:
        page = (<IssuePage
          actions={actions}
        />);
        break;
      case pages.PULL_REQUESTS:
        page = (<PullRequestPage
          actions={actions}
        />);
        break;
      case pages.SETTINGS:
        page = (<SettingsPage
          actions={actions}
        />);
        break;
      default:
        page = (<SettingsPage
          actions={actions}
        />);
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
