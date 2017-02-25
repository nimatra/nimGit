import React, { PropTypes, Component } from 'react';
import { FontIcon } from 'material-ui';


export default class Footer extends Component {

  static propTypes = {
    onShow: PropTypes.func.isRequired,
    getNotifications: PropTypes.func.isRequired,
    getPullRequests: PropTypes.func.isRequired,
    token: PropTypes.object.isRequired,
    fullRepoName: PropTypes.object.isRequired,
  };

  constructor(props, context) {
    super(props, context);
    if (props.onShow) {
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.onShow) {
    }
  }
  openGithub = function() {
    debugger;
    chrome.tabs.create({ url: 'https://github.com/nimatra/githubextension' });
  }

  renderClearButton() {
    const { getNotifications, getPullRequests, token, fullRepoName } = this.props;
    const onClickHandler = () => {
      getNotifications(token);
      getPullRequests(fullRepoName, token);
    };
    return (
      <div>
        <FontIcon
          className="muidocs-icon-custom-github"
          color={fullWhite}
        />
        <button
          className={style.clearRead}
          onClick={onClickHandler}
        >
          Refresh
        </button>
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
