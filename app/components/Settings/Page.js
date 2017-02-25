import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';
import { TextField, FlatButton, RadioButtonGroup, RadioButton } from 'material-ui';
import { reposSelector, activeRepoSelector, usernameSelector, userSelector, tokenSelector } from '../../selectors/settings';
import * as Pages from '../../constants/Pages';

const errorMessage = 'Double-check this field';

class Settings extends Component {
  static propTypes = {
    repos: PropTypes.array,
    activeRepo: PropTypes.object,
    username: PropTypes.string,
    user: PropTypes.object,
    token: PropTypes.string,
    actions: PropTypes.object.isRequired,
  };

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

  saveHandler(e) {
    const { actions } = this.props;
    actions.validateSettings(this.state.token, this.state.username, this.state.repo, this.state.owner);
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
      <div>
        <TextField
          id="Token-Text-Field"
          floatingLabelText="Token"
          errorText={this.state.invalidToken}
          value={this.state.token}
          onChange={e => this.tokenChangeHandler(e)}
        />
        <br />
        <TextField
          id="Username-Text-Field"
          floatingLabelText="Username"
          errorText={this.state.invalidUsername}
          value={this.state.username}
          onChange={e => this.usernameChangeHandler(e)}
        />
        <br />
        <TextField
          id="Owner-Text-Field"
          floatingLabelText="Repository Owner"
          errorText={this.state.invalidOwner}
          value={this.state.owner}
          onChange={e => this.ownerChangeHandler(e)}
        />
        <br />
        <TextField
          id="Repo-Text-Field"
          floatingLabelText="Repository Name"
          errorText={this.state.invalidRepo}
          value={this.state.repo}
          onChange={e => this.repoChangeHandler(e)}
        />
        <br />
        <br />
        <RadioButtonGroup
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
        </RadioButtonGroup>
        <div style={{ float: 'right' }}>
          <FlatButton label="SAVE" primary onClick={e => this.saveHandler(e)} />
        </div>
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
