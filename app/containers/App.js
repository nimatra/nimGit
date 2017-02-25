import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { MuiThemeProvider } from 'material-ui';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Router from '../components/Router';
import combinedActions from '../actions';


// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

@connect(
  state => ({
    navigation: state.navigation,
    settings: state.settings,
  }),
  dispatch => ({
    actions: bindActionCreators(combinedActions, dispatch),
  })
)
export default class App extends Component {

  static propTypes = {
    navigation: PropTypes.object.isRequired,
    settings: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  componentWillMount() {
  }

  render() {
    const { navigation, settings, actions } = this.props;
    // const theme = settings.isDarkThemeOn ? darkBaseTheme : lightBaseTheme;

    return (
      <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
        <Router
          navigation={navigation}
          settings={settings}
          actions={actions}
        />
      </MuiThemeProvider>
    );
  }
}
