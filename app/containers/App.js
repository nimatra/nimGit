import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import blueGrey from '@material-ui/core/colors/blueGrey';
import Router from '../components/Router';
import combinedActions from '../actions';

const theme = createMuiTheme({
  palette: {
    primary: { main: blueGrey[500] }, // Purple and green play nicely together.
    secondary: { main: '#11cb5f' }, // This is just green.A700 as hex.
    type: 'light',
  },
  typography: {
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
});

// Needed for onTouchTap
class App extends Component {
  render() {
    const { navigation, settings, actions } = this.props;
    // const theme = settings.isDarkThemeOn ? darkBaseTheme : lightBaseTheme;

    return (
      <MuiThemeProvider theme={theme}>
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
