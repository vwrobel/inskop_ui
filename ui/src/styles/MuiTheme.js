import {
  cyan500, cyan700,
  pinkA200,
  grey100, grey300, grey400, grey500,
  white, darkBlack, fullBlack
} from 'material-ui/styles/colors';
import { fade } from 'material-ui/utils/colorManipulator';
import spacing from 'material-ui/styles/spacing';


export const scopethisDark = '#182124'; // check main.css
export const scopethisMedium = '#81a1ab';
export const scopethisLight = '#dbe3e7';
export const scopethisLighter = '#edf1f3';
export const scopethisPink = '#ff4081';

export default {
  spacing,
  fontFamily: 'Asap, sans-serif',
  palette: {
    primary1Color: scopethisDark,
    primary2Color: cyan700,
    primary3Color: grey400,
    accent1Color: scopethisPink,
    accent2Color: grey100,
    accent3Color: grey500,
    textColor: scopethisDark,
    alternateTextColor: scopethisLighter,
    canvasColor: scopethisLight,
    borderColor: grey300,
    disabledColor: fade(scopethisDark, 0.3),
    pickerHeaderColor: cyan500,
    clockCircleColor: fade(scopethisDark, 0.07),
    shadowColor: scopethisDark,
    scopethisDark,
    scopethisLight,
    scopethisLighter,
    scopethisPink
  }
};
