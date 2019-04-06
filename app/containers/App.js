import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { MuiThemeProvider } from 'material-ui';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import Router from '../components/Router';
import combinedActions from '../actions';


// Needed for onTouchTap
class App extends Component {

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

function mapDispatchToProps() {
  return dispatch => ({
    actions: bindActionCreators(combinedActions, dispatch),
  });
}

function mapStateToProps() {
  return state => ({
    navigation: state.navigation,
    settings: state.settings,
  });
}

export default connect(
  mapStateToProps(),
  mapDispatchToProps()
)(App);
