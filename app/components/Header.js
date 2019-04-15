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
import Chip from '@material-ui/core/Chip';
import * as Pages from '../constants/Pages';
import { activePageSelector } from '../selectors/navigation';
import {
  getActiveRepo, tokenSelector, userSelector, reposSelector,
} from '../selectors/settings';

const tabStyle = {
  height: '45px',
};
const formStyle = {
  display: 'flex',
  width: '50%',
  background: 'white',
  margin: '0 auto',
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
    this.state = { firstRun: true, selectedRepo: [] };
  }

  handleChange = (event) => {
    const { actions } = this.props;
    actions.setActiveRepo(event.target.value);
    this.setState({ selectedRepo: event.target.value });
    this.refreshData();
  };

  switchTo = (page) => {
    const {
      actions,
    } = this.props;
    actions.navigateTo(page);
  }

  refreshData() {
    const {
      actions, activeRepo, token
    } = this.props;
    const repo = activeRepo;
    if (repo && repo.owner) {
      actions.getPullRequests(repo.name, repo.owner.login, token);
      actions.getIssues(repo.name, repo.owner.login, token);
    }
  }

  render() {
    const { activePage, repos } = this.props;
    const { selectedRepo } = this.state;
    return (
      <div style={{ marginBottom: '8px', background: 'white' }}>
        <FormControl style={formStyle}>
          <InputLabel htmlFor="repo-selection">Repo</InputLabel>
          <Select
            value={selectedRepo}
            onChange={this.handleChange}
            input={<Input id="repo-selection" />}
            renderValue={selected => (
              <Chip key={selected.id} label={selected.name} />
            )}
            MenuProps={MenuProps}
          >
            {repos.map(repo => (
              <MenuItem key={repo.id} value={repo.name}>
                {repo}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <BottomNavigation value={activePage} onChange={(e, v) => this.switchTo(v)} style={{ height: '50px' }}>
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
});

const HeaderComponent = connect(
  mapStateToProps
)(Header);

export default HeaderComponent;
