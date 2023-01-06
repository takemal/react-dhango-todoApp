// Pick colors on https://material.io/resources/color/#!/

import { createTheme } from '@mui/material';

export const theme = createTheme({
  typography: {
    fontFamily: '"Comic Neue",cursive',
    allVariants: {
      color: 'white',
    },
  },
  components: {
    MuiInputBase: {
      styleOverrides: {
        input: {
          color: 'white',
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: 'standard',
        fullWidth: true,
        required: true,
      },
    },
  },
});
