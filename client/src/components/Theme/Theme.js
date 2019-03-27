/**
 *    SPDX-License-Identifier: Apache-2.0
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import indigo from '@material-ui/core/colors/indigo';
import lightBlue from '@material-ui/core/colors/lightBlue';
import red from '@material-ui/core/colors/red';
import { themeSelectors } from '../../state/redux/theme';
import '../../static/css/main.css';
import '../../static/css/main-dark.css';
import '../../static/css/media-queries.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'font-awesome/css/font-awesome.min.css';

class Theme extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  render() {
    const { mode, children } = this.props;
    return (
      <MuiThemeProvider theme={this.getTheme(mode)}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    );
  }

  getTheme(mode) {
    return createMuiTheme({
      palette: {
        contrastThreshold: 3,
        tonalOffset: 0.2,
        background: { paper: mode === 'dark' ? '#222222' : '#ffffff' },
        primary:{light:"rgba(236, 106, 133, 1)",main:"rgba(217, 43, 67, 1)",dark:"rgba(167, 9, 29, 1)",contrastText:"#fff"},
        secondary:{light:"rgba(240, 240, 240, 1)",main:"rgba(155, 155, 155, 1)",dark:"rgba(74, 74, 74, 1)",contrastText:"#fff"},
        error: {
          main: red[500],
        },
        toggleClass: true,
        type: mode,
      },
    });
  }
}

const { modeSelector } = themeSelectors;

export default connect(state => ({
  mode: modeSelector(state),
}))(Theme);
