import React, { Component } from 'react';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';
import { TextField, FlatButton, RadioButtonGroup, RadioButton, RaisedButton, FontIcon } from 'material-ui';
import { reposSelector, activeRepoSelector, usernameSelector, userSelector, tokenSelector } from '../../selectors/settings';
import * as Pages from '../../constants/Pages';

const errorMessage = 'Double-check this field';
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
      owner: activeRepo && activeRepo.owner ? activeRepo.owner.login : '',
      invalidOwner: '',
      repo: activeRepo ? activeRepo.name : '',
      invalidRepo: '',
      theme: false,
    };
  }


  nimGitClick = () => {
    chrome.tabs.create({ url: 'https://github.com/nimatra/nimGit' });
  };

  saveHandler(e) {
    const { actions } = this.props;
    actions.validateSettings(this.state.token, this.state.username, this.state.repo, this.state.owner);
    actions.getPullRequests(this.state.repo, this.state.owner, this.state.token);
    actions.getIssues(this.state.repo, this.state.owner, this.state.token);
    actions.navigateTo(Pages.ISSUES);
    // const isUserValid = actions.getUser(this.state.token, this.state.username);
    // const isRepoValid = actions.getRepo(this.state.token, this.state.repo, this.state.owner);
    // if (isUserValid && isRepoValid) {
    //   actions.setToken(this.state.token);
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

  tokenChangeHandler(e) {
    this.setState({
      token: e.target.value,
    });
  }
  usernameChangeHandler(e) {
    this.setState({
      username: e.target.value,
    });
  }
  ownerChangeHandler(e) {
    this.setState({
      owner: e.target.value,
    });
  }
  repoChangeHandler(e) {
    this.setState({
      repo: e.target.value,
    });
  }
  themeChangeHandler(e, v) {
    const { actions } = this.props;
    actions.setDarkTheme(!!v);
  }
  render() {
    // const { repos, activeRepo, username, token, actions } = this.props;
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
          floatingLabelText="Github 'Personal Access Token' with 'repo' permissions"
          errorText={this.state.invalidToken}
          value={this.state.token}
          type="password"
          style={{ width: '80%' }}
          onChange={e => this.tokenChangeHandler(e)}
        />
        <br />
        <TextField
          id="Username-Text-Field"
          floatingLabelText="Username"
          errorText={this.state.invalidUsername}
          value={this.state.username}
          style={{ width: '80%' }}
          onChange={e => this.usernameChangeHandler(e)}
        />
        <br />
        <TextField
          id="Owner-Text-Field"
          floatingLabelText="Repository Owner"
          errorText={this.state.invalidOwner}
          value={this.state.owner}
          style={{ width: '80%' }}
          onChange={e => this.ownerChangeHandler(e)}
        />
        <br />
        <TextField
          id="Repo-Text-Field"
          floatingLabelText="Repository Name"
          errorText={this.state.invalidRepo}
          value={this.state.repo}
          style={{ width: '80%' }}
          onChange={e => this.repoChangeHandler(e)}
        />
        <br />
        <br />
        { /* <RadioButtonGroup
          name="Theme"
          defaultSelected={false}
          onChange={(e, v) => this.themeChangeHandler(e, v)}
        >
          <RadioButton
            value={false}
            label="Light Theme"
          />
          <RadioButton
            value
            label="Dark Theme"
          />
        </RadioButtonGroup>*/}
        <RaisedButton
          label="SAVE"
          secondary
          onClick={e => this.saveHandler(e)}
          style={{ float: 'right', margin: '50px 0 0 0' }}
        />
        <RaisedButton
          onClick={e => this.nimGitClick(e)}
          primary
          style={{ float: 'bottom left', margin: '50px 0 0 0' }}
          label="nimGit"
          icon={<FontIcon className="muidocs-icon-custom-github" />}
        />
      </div>
    );
  }
}


const mapStateToProps = state => ({
  repos: reposSelector(state),
  activeRepo: activeRepoSelector(state),
  username: usernameSelector(state),
  user: userSelector(state),
  token: tokenSelector(state),
});

const SettingsComponent = connect(
  mapStateToProps
)(Settings);

export default SettingsComponent;
