import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            light: '#555',
            main: '#333',
            dark: '#000',
            contrastText: '#fff',
        },
        secondary: {
            light: '#ff7961',
            main: '#ecc19c',
            dark: '#1e847f',
            contrastText: '#fff',
        },
        accent: {
            alert: '#f00',
            warning: '#f90',
            approve: '#0f0',
        },
    },
});

export default theme;