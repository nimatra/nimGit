import React, { Component } from 'react';
import { SourcePull, CommentQuestion, Settings } from 'mdi-material-ui';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import { connect } from 'react-redux';
import { activeRepoSelector, tokenSelector, userSelector } from '../selectors/settings';
import { activePageSelector } from '../selectors/navigation';
import * as Pages from '../constants/Pages';

const tabStyle = {
  height: '45px',
};
class Header extends Component {
  constructor(props) {
    super(props);
    this.state = { firstRun: true };
  }

  switchTo = function(page) {
    const { actions, activeRepo, token } = this.props;
    if (activeRepo && activeRepo.owner) {
      actions.getPullRequests(activeRepo.name, activeRepo.owner.login, token);
      actions.getIssues(activeRepo.name, activeRepo.owner.login, token);
    }
    actions.navigateTo(page);
  }

  render() {
    const { activePage, user } = this.props;
    return (
      <div style={{ marginBottom: '8px' }}>
        <BottomNavigation value={activePage} onChange={e => this.switchTo(e)} style={{ height: '50px' }}>
          <BottomNavigationAction
            label="ISSUES"
            value={Pages.ISSUES}
            style={tabStyle}
            icon={<CommentQuestion />}
          />
          <BottomNavigationAction
            label="PULL REQUESTS"
            value={Pages.PULL_REQUESTS}
            style={tabStyle}
            icon={<SourcePull />}
          />
          <BottomNavigationAction
            icon={<Settings />}
            value={Pages.SETTINGS}
            style={tabStyle}
          />
        </BottomNavigation>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  activePage: activePageSelector(state),
  activeRepo: activeRepoSelector(state),
  token: tokenSelector(state),
  user: userSelector(state),
});

const HeaderComponent = connect(
  mapStateToProps
)(Header);

export default HeaderComponent;
