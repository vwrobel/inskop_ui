import {
  cyan500, cyan700,
  pinkA200,
  grey100, grey300, grey400, grey500,
  white, darkBlack, fullBlack
} from 'material-ui/styles/colors';
import { fade } from 'material-ui/utils/colorManipulator';
import spacing from 'material-ui/styles/spacing';


export const inskopDark = '#182124'; // check main.css
export const inskopMedium = '#81a1ab';
export const inskopLight = '#dbe3e7';
export const inskopLighter = '#edf1f3';
export const inskopPink = '#ff4081';

export default {
  spacing,
  fontFamily: 'Asap, sans-serif',
  palette: {
    primary1Color: inskopDark,
    primary2Color: cyan700,
    primary3Color: grey400,
    accent1Color: inskopPink,
    accent2Color: grey100,
    accent3Color: grey500,
    textColor: inskopDark,
    alternateTextColor: inskopLighter,
    canvasColor: inskopLight,
    borderColor: grey300,
    disabledColor: fade(inskopDark, 0.3),
    pickerHeaderColor: cyan500,
    clockCircleColor: fade(inskopDark, 0.07),
    shadowColor: inskopDark,
    inskopDark,
    inskopLight,
    inskopLighter,
    inskopPink
  }
};
