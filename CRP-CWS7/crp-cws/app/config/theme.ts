import Fonts from "libs/assets/fonts";
import { ITheme } from "libs/config/theme";
import color from "./color";

export const DefaultTheme: Partial<ITheme> = {
  colors: {
    primary: color.primary_main,
    secondary: color.secondary_main,
    background: color.primary_surface,
    card: color.natural_100,
    text: color.natural_20,
    textSecondary: color.natural_50,
    textLight: color.natural_100,
    border: color.primary_border,
    notification: "rgb(255, 69, 58)",
  },
  statusBar: {
    barStyle: "dark-content",
    backgroundColor: "#00000000",
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  splashImage: require("app/assets/images/logo.png"),
  styles: {
    input: {
      backgroundColor: color.natural_100,
      borderWidth: 0,
      borderRadius: 8,
    },
    button: {
      borderRadius: 999,
    },
  },
  fontStyle: {
    light: Fonts.MontserratMedium,
    lightItalic: Fonts.InterRegular,
    regular: Fonts.InterRegular,
    regularItalic: Fonts.InterBold,
    bold: Fonts.GothamBold,
    boldItalic: Fonts.MontserratBold,
  },
};

export const DarkTheme: Partial<ITheme> = {};
