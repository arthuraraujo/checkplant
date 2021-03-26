import { DefaultTheme } from 'react-native-paper';

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#00796B',
    primaryLightColor: '#67dfdf',
    primaryDarkColor: '#82ada9',
    secondaryColor: '#6d4c41',
    secondaryLightColor: '#9c786c',
    secondaryDarkColor: '#40241a',
    primaryTextColor: '#000000',
    secondaryTextColor: '#ffffff',
  },
};

export default theme;
