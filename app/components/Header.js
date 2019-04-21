import React, { Component } from 'react';
import { SourcePull, CommentQuestion, Settings } from 'mdi-material-ui';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import { connect } from 'react-redux';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import RepoSelect from './RepoSelect';
import * as Pages from '../constants/Pages';
import { activePageSelector } from '../selectors/navigation';
import {
  getActiveRepo, tokenSelector, userSelector, reposSelector, getRepo,
} from '../selectors/settings';

const tabStyle = {
  height: '45px',
};
const formStyle = {
  display: 'flex',
  width: '33%',
  background: 'white',
  margin: '0 auto',
  float: 'right',
};
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
class Header extends Component {
  constructor(props) {
    super(props);
    this.state = { firstRun: true, selectedRepo: props.activeRepo };
  }

  handleChange = (repo) => {
    const { actions } = this.props;
    actions.setActiveRepo(repo.value);
    this.setState({ selectedRepo: repo.value });
    this.refreshData(repo.value);
  };

  switchTo = (page) => {
    const {
      actions,
    } = this.props;
    actions.navigateTo(page);
  }

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
    const { activePage, repos } = this.props;
    return (
      <div style={{ paddingBottom: '10px', paddingTop: '10px', background: 'white' }}>
        <FormControl style={formStyle}>
          <RepoSelect
            suggestions={repos.map(repo => ({ label: repo.name, value: repo.name }))}
            selectRepo={this.handleChange}
          />
        </FormControl>
        <BottomNavigation
          showLabels
          value={activePage}
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
