import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  typography: {
    fontFamily: '"Noto Sans KR", serif',
  }
})

ReactDOM.render(<MuiThemeProvider theme={theme}><App /></MuiThemeProvider>,
  document.getElementById('root')
);

export { default as main } from './main';
export { default as list } from './list';

serviceWorker.unregister();
