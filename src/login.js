import {ThemeProvider} from "@mui/material/styles";
import theme from "./theme";
import CssBaseline from "@mui/material/CssBaseline";
import {Button} from "@mui/material";
import React from "react";

export default function Login() {

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <div>
                <Button sx={{
                    backgroundColor: 'secondary.main'
                }}
                        variant='contained'>no co jest</Button>
                <Button sx={{
                    backgroundColor: 'primary.dark'
                }}
                        variant='contained'>no co jest</Button>
            </div>
        </ThemeProvider>
    );
}