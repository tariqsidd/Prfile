import React from "react";
import Wrapper from "../../components/Wrapper";
import {Typography} from "@mui/material";

const NotFound = ()=>{
    return(
        <Wrapper>
            <Typography variant="h1" gutterBottom component="div" style={{margin:0}}>
                No Route Found
            </Typography>
        </Wrapper>
    )
};

export default NotFound
