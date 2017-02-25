import React, { PropTypes, Component } from 'react';
import { Tabs, Tab, Avatar, FontIcon } from 'material-ui';
import { connect } from 'react-redux';
import { activeRepoSelector, tokenSelector, userSelector } from '../selectors/settings';
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
    user: PropTypes.object,
  };

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
    const iconSource = user && user.avatar_url ? user.avatar_url : 'http://www.flaticon.com/premium-icon/icons/svg/327/327924.svg';
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
            icon={<Avatar src={iconSource} size={30} />}
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
  user: userSelector(state),
});

const HeaderComponent = connect(
  mapStateToProps
)(Header);

export default HeaderComponent;
