import React, { Component } from 'react';
import { SourcePull, CommentQuestion, Settings, Json } from 'mdi-material-ui';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import { connect } from 'react-redux';
import * as Pages from '../constants/Pages';
import { activePageSelector } from '../selectors/navigation';
import {
  getActiveRepo, tokenSelector, userSelector, reposSelector, getRepo,
} from '../selectors/settings';

const tabStyle = {
  height: '45px',
};
class Header extends Component {
  switchTo = (page) => {
    const {
      actions,
    } = this.props;
    actions.navigateTo(page);
  }

  render() {
    const { activePage, token } = this.props;
    return (
      <div style={{ paddingBottom: '10px', paddingTop: '10px', background: 'white' }}>
        <BottomNavigation
          showLabels
          value={activePage || token ? Pages.PULL_REQUESTS : Pages.SETTINGS}
          onChange={(e, v) => this.switchTo(v)}
          style={{ height: '50px', marginRight: '5px', marginTop: '5px' }}
        >
          <BottomNavigationAction
            label="Pull Requests"
            value={Pages.PULL_REQUESTS}
            style={tabStyle}
            icon={<SourcePull />}
          />
          <BottomNavigationAction
            label="Issues"
            value={Pages.ISSUES}
            style={tabStyle}
            icon={<CommentQuestion />}
          />
          <BottomNavigationAction
            label="Settings"
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
  activeRepo: getActiveRepo(state),
  token: tokenSelector(state),
  user: userSelector(state),
  repos: reposSelector(state),
  getRepo: getRepo(state),
});

const HeaderComponent = connect(
  mapStateToProps
)(Header);

export default HeaderComponent;
