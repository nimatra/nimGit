import React, { PropTypes, Component } from 'react';
import { Tabs, Tab } from 'material-ui';
import { connect } from 'react-redux';
import { activeRepoSelector, tokenSelector } from '../selectors/settings';
import { activePageSelector } from '../selectors/navigation';
import * as Pages from '../constants/Pages';

const tabStyle = {
  height: '45px',
};
class Header extends Component {

  static propTypes = {
    actions: PropTypes.object,
    activePage: PropTypes.string,
    activeRepo: PropTypes.object,
    token: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = { open: false };
  }

  switchTo = function(page) {
    const { actions, activeRepo, token } = this.props;
    if (activeRepo) {
      actions.getPullRequests(activeRepo.name, activeRepo.owner.login, token);
      actions.getIssues(activeRepo.name, activeRepo.owner.login, token);
    }
    actions.navigateTo(page);
  }

  render() {
    const { activePage } = this.props;
    return (
      <div style={{ marginBottom: '8px' }}>
        <Tabs value={activePage} onChange={e => this.switchTo(e)} style={{ height: '30px' }}>
          <Tab
            label="ISSUES"
            value={Pages.ISSUES}
            style={tabStyle}
          />
          <Tab
            label="PULL REQUESTS"
            value={Pages.PULL_REQUESTS}
            style={tabStyle}
          />
          <Tab
            label="SETTINGS"
            value={Pages.SETTINGS}
            style={tabStyle}
          />
        </Tabs>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  activePage: activePageSelector(state),
  activeRepo: activeRepoSelector(state),
  token: tokenSelector(state),
});

const HeaderComponent = connect(
  mapStateToProps
)(Header);

export default HeaderComponent;
