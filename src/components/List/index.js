import React from 'react';
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar/ListItemAvatar";
import {Avatar, IconButton, Typography} from "@mui/material";
import ListItemText from "@mui/material/ListItemText/ListItemText";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import EditIcon from '@mui/icons-material/Edit';
import moment from "moment";

const _List = ({data=[], editExp, onClick}) => {

    const dividerCondition = (index)=>{
        return index === data.length-1 ? 'none' : 'block'
    };

    const dateReturn = (date)=>{
        return date.length ?
            moment(date).format("MMM YYYY") :
            ''
    };

    return(
        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
            {data.map((i, index)=>(
                <Box key={index}>
                    <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                            <Avatar variant={'square'} alt="Remy Sharp" src={i?.logo?.url} />
                        </ListItemAvatar>
                        <ListItemText
                            primary={
                                <Typography
                                    sx={{ display: 'block' }}
                                    component="span"
                                    variant="h6"
                                    color="text.primary">
                                    {i?.designation}
                                </Typography>
                            }
                            secondary={
                                <React.Fragment>
                                    <Typography
                                        sx={{ display: 'block' }}
                                        component="span"
                                        variant="body2"
                                        color="text.primary">
                                        {i?.company_name} . {i?.full_time ? 'Full Time' : 'Part Time'}
                                    </Typography>
                                    <Typography
                                        sx={{ display: 'block' }}
                                        component="span"
                                        variant="overline"
                                        color="text.primary">
                                        {dateReturn(i?.start_date)} - {i?.current_company ? 'Present' : dateReturn(i?.end_date)}
                                    </Typography>
                                </React.Fragment>
                            }
                        />
                        {editExp &&
                        <Box style={{display:'flex', alignSelf:'flex-end'}}>
                            <IconButton onClick={()=>{onClick(i)}} aria-label="delete">
                                <EditIcon />
                            </IconButton>
                        </Box>}
                    </ListItem>
                    <Divider style={{display: dividerCondition(index)}} variant="inset" component="li" />
                </Box>
            ))}
        </List>
    )
};

export default _List;
