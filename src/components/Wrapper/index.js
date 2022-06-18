import React from 'react'
import {Grid, Paper} from "@mui/material";

const Wrapper = ({children})=>{
    return(
        <Grid
            container
            spacing={2}
            justifyContent="center"
            alignItems="flex-start">
            <Grid item xs={6}>
                <Paper style={{flex:1, padding:10}} elevation={3}>
                    {children}
                </Paper>
            </Grid>
        </Grid>
    )
};

export default Wrapper
