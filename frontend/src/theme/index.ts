import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#331800',
    },
    secondary: {
      main: '#B2BFC2',
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#6B757D',
    },
  },
  shape: {
    borderRadius: 0,
  },
});

export default theme;
