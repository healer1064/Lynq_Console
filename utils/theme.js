import { createTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: '#4cc9f0',
    },
    secondary: {
      main: '#19857b',
    },
    btn: { 
      main: '#422961'
    },
    menu: {
      main: '#CF455C'
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#fff',
      black: '#000'
    },
    font: '#fff',
    fontGrey: '#7B8591',
    blue: '#33439B',
    white: '#fff',
    supportbg: '#0C0C0C',
    copyright1: '#7B8591',
    copyright2: '#4F396B',
    menuBg: '#1D3149',
    sun: 'yellow'
  },
  margintop: '1rem',
  margintopMain: '4rem',
  marginSection: '2rem',
});

export default theme;