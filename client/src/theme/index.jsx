import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  colors: {
    brand: {
      mainBg: '#2A264E',
      secondaryBg: '#776DD5',
      white: '#FFFFFF',
      black: '#000000',
      cardBg: 'linear-gradient(90deg, #9196CF 100%, #4B57A5 100%)',
    },
  },
});

export default theme;
