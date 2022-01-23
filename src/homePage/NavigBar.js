//This component provides navigation bar with image and text
import * as React from 'react';
//material ui
import Box from '@mui/material/Box';
import {
    AppBar,
    Toolbar,
    makeStyles,
    Typography
} from "@material-ui/core";
//custom imports
import proximityLogo from '../images/proximityLogo.png';
import { themeColors } from '../lib/theme';

const useStyles = makeStyles({
    header: {
        backgroundColor: themeColors.black,
        color: themeColors.white,
        padding: 5,
    },
    navItems: {
        justifyContent: 'space-between',
    }
});

export default function NavigBar(props) {
    const theme = useStyles();

    return (
        <React.Fragment>
            <AppBar className={theme.header}>
                <Toolbar className={theme.navItems} >
                    <Box
                        component="img"
                        sx={{
                            height: 54,
                        }}
                        src={proximityLogo}
                    />
                    <Typography variant="h6" m="auto"
                    >Air Quality Monitoring</Typography>
                </Toolbar>
            </AppBar>
        </React.Fragment >
    );
}
