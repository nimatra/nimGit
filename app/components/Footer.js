import React, { Component } from 'react';
import Icon from '@material-ui/core/Icon';
import { GithubCircle, Refresh } from 'mdi-material-ui';


export default class Footer extends Component {
  openGithub = function() {
    chrome.tabs.create({ url: 'https://github.com/nimatra/nimgit' });
  }

  renderClearButton() {
    const {
      getNotifications, getPullRequests, token, fullRepoName,
    } = this.props;
    const onClickHandler = () => {
      getNotifications(token);
      getPullRequests(fullRepoName, token);
    };
    return (
      <div>
        <GithubCircle />
        <Refresh />
      </div>
    );
  }

  render() {
    this.renderClearButton();
    return (
      <div className={style.footer}>
        {this.renderClearButton()}
      </div>
    );
  }
}
