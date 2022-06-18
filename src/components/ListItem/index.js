import React from 'react';
import ListItemAvatar from "@mui/material/ListItemAvatar/ListItemAvatar";
import {Avatar, Typography, Button} from "@mui/material";
import ListItemText from "@mui/material/ListItemText/ListItemText";
import ListItem from "@mui/material/ListItem";
import { useNavigate } from "react-router-dom";

const _ListItem = ({user={}})=>{
    const navigate = useNavigate();
    return(
        <Button onClick={()=>{navigate(`/${user.id}`)}} fullWidth variant="text">
            <ListItem alignItems="center" style={{borderWidth:1}}>
                <ListItemAvatar style={{marginRight:10}}>
                    <Avatar style={{width: 100, height:100}} variant={'round'} alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                </ListItemAvatar>
                <ListItemText
                    primary={
                        <>
                            <Typography
                                sx={{ display: 'inline' }}
                                component="span"
                                variant="h6"
                                color="text.primary">
                                {user?.name}
                            </Typography>
                            <Typography
                                sx={{ display: 'inline', marginLeft:5 }}
                                component="span"
                                variant="h6"
                                color="text.primary">
                                Age: {user?.age}
                            </Typography>
                        </>
                    }
                    secondary={
                            <Typography
                                sx={{ display: 'block' }}
                                component="span"
                                variant="overline"
                                color="text.primary">
                                Designation: {user?.current_company?.designation}
                            </Typography>
                    }
                />
            </ListItem>
        </Button>
    )
};

export default _ListItem;
