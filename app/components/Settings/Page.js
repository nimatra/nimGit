import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TextField, IconButton } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { DoorOpen, GithubFace } from 'mdi-material-ui';
import { Add } from '@material-ui/icons';
import OwnersChips from './ownersChips';
import {
  reposSelector, getActiveRepo, usernameSelector, userSelector, tokenSelector, ownersSelector,
} from '../../selectors/settings';
import * as Pages from '../../constants/Pages';

const style = {
  margin: '15px',
};

class Settings extends Component {
  constructor(props, context) {
    super(props, context);

    const { activeRepo, username, token } = this.props;
    this.state = {
      editing: false,
      username,
      invalidUsername: '',
      token,
      invalidToken: '',
      // owner: activeRepo && activeRepo.owner ? activeRepo.owner.login : '',
      owner: '',
      owners: {},
      invalidOwner: '',
      repo: activeRepo ? activeRepo.name : '',
      invalidRepo: '',
      theme: false,
    };
  }


  nimGitClick = () => {
    chrome.tabs.create({ url: 'https://github.com/nimatra/nimGit' });
  };

  saveHandler = () => {
    const { actions, owners: reduxOwners} = this.props;
    const {
      owners, token, username, repo,
    } = this.state;
    const allOwners = [...Object.values(owners), ...reduxOwners.map(o => o.login)];
    actions.validateSettings(token, username, repo, allOwners);
    actions.navigateTo(Pages.ISSUES);

    // const isUserValid = actions.getUser(token, username);
    // const isRepoValid = actions.getRepo(token, repo, owner);
    // if (isUserValid && isRepoValid) {
    //   actions.setToken(token);
    //   actions.navigateTo(Pages.PULL_REQUESTS);
    // } else {
    //   this.setState({
    //     invalidToken: '',
    //     invalidUsername: '',
    //     invalidOwner: '',
    //     invalidRepo: '',
    //   });

    //   if (!isUserValid) {
    //     this.setState({
    //       invalidToken: errorMessage,
    //       invalidUsername: errorMessage,
    //     });
    //   }
    //   if (!isRepoValid) {
    //     this.setState({
    //       invalidOwner: errorMessage,
    //       invalidRepo: errorMessage,
    //     });
    //   }
    // }
  }

  tokenChangeHandler = (e) => {
    this.setState({
      token: e.target.value,
    });
  }

  usernameChangeHandler = (e) => {
    this.setState({
      username: e.target.value,
    });
  }

  ownerChangeHandler = (e) => {
    this.setState({
      owner: e.target.value,
    });
  }

  addOwnerHandler = (e) => {
    const { actions } = this.props;
    const { owner, owners } = this.state;
    if (actions && owner) {
      const newOwners = owners;
      newOwners[`${owner}`] = owner;
      this.setState({
        owner: '',
        owners: newOwners,
      });
    }
  }

  repoChangeHandler = (e) => {
    this.setState({
      repo: e.target.value,
    });
  }

  themeChangeHandler = (v) => {
    const { actions } = this.props;
    actions.setDarkTheme(!!v);
  }

  render() {
    const {
      owners: reduxOwners,
      actions,
    } = this.props;
    const {
      owners, token, username, invalidToken,
      invalidUsername, invalidOwner, owner,
    } = this.state;
    const allOwners = [...Object.values({ ...owners, ...reduxOwners })];
    // if (token && username && !isEmpty(repos) && activeRepo) {
    //   if (actions.validateSettings(
    //     token,
    //     username,
    //     activeRepo.name,
    //     activeRepo.owner.login)) {
    //     actions.navigateTo(Pages.PULL_REQUESTS);
    //   }
    // }

    return (
      <div style={style}>
        <TextField
          id="Token-Text-Field"
          placeholder="Github 'Personal Access Token' with 'repo' permissions"
          helperText={invalidToken}
          error={!!invalidToken}
          value={token}
          type="password"
          style={{ width: '80%' }}
          onChange={this.tokenChangeHandler}
          margin="normal"
          variant="outlined"
          label="Token"
        />
        <br />
        <TextField
          id="Username-Text-Field"
          placeholder="Username"
          helperText={invalidUsername}
          error={!!invalidUsername}
          value={username}
          style={{ width: '80%' }}
          onChange={this.usernameChangeHandler}
          margin="normal"
          variant="outlined"
          label="Username"
        />
        <br />
        <div style={{ display: 'flex' }}>
          <TextField
            id="Owner-Text-Field"
            placeholder="Repository Owner"
            helperText={invalidOwner}
            error={!!invalidOwner}
            value={owner}
            style={{ width: '72%' }}
            onChange={this.ownerChangeHandler}
            margin="normal"
            variant="outlined"
            label="Repo Owner"
          />
          <IconButton
            aria-label="Add"
            onClick={this.addOwnerHandler}
            style={{ margin: 'auto 0' }}
          >
            <Add />
          </IconButton>
        </div>
        <br />
        <OwnersChips
          actions={actions}
          owners={allOwners}
          style={{ width: '80%' }}
        />
        <br />
        {/* <TextField
          id="Repo-Text-Field"
          placeholder="Repository Name"
          helperText={invalidRepo}
          error={!!invalidRepo}
          value={repo}
          style={{ width: '80%' }}
          onChange={this.repoChangeHandler}
          margin="normal"
          variant="outlined"
          label="Repo Name"
        />
        <br /> */}
        <br />
        <Button
          variant="contained"
          label="SAVE"
          style={{ float: 'left' }}
          onClick={this.saveHandler}
        >
        Save
        </Button>
        <Button
          variant="contained"
          onClick={this.nimGitClick}
          style={{ float: 'right' }}
          label="nimGit"
        >
          <GithubFace />

        </Button>
      </div>
    );
  }
}


const mapStateToProps = state => ({
  repos: reposSelector(state),
  activeRepo: getActiveRepo(state),
  username: usernameSelector(state),
  user: userSelector(state),
  token: tokenSelector(state),
  owners: ownersSelector(state),
});

const SettingsComponent = connect(
  mapStateToProps
)(Settings);

export default SettingsComponent;
