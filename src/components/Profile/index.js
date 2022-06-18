import React, {useState} from "react";
import {Avatar, Box, Grid, IconButton, Paper, Typography} from "@mui/material";
import {styles} from "../styles";
import EditIcon from '@mui/icons-material/Edit';
import Wrapper from "../Wrapper";
import ProfilePicModal from "../profilePicModal";

const Profile = ({user, showEditFrom})=>{
    const [showPicModal, setShowPicModal] = useState(false);
    console.log('showEditFrom',showEditFrom)
    return(
        <Wrapper>
            <Paper style={styles.header}>
                <Avatar
                    alt="Remy Sharp"
                    style={styles.profilePic}
                    onClick={()=>{setShowPicModal(true)}}
                    src={user?.profile_pic?.url}/>
                <IconButton
                    aria-label="delete"
                    onClick={showEditFrom}
                    style={styles.editProfileButton}>
                    <EditIcon />
                </IconButton>
            </Paper>
            <Paper elevation={0} style={styles.profileTextCont}>
                <Grid container>
                    <Grid item xs={8}>
                        <Typography variant="h5" gutterBottom component="div">
                            {user?.name}
                        </Typography>
                        <Typography variant="subtitle1" gutterBottom component="div">
                            {user?.top_skills}
                        </Typography>
                        <Typography variant="overline" gutterBottom>
                            {user?.location}
                        </Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Box style={styles.logoCont} >
                            <Avatar
                                style={{marginRight:5}}
                                variant={'square'}
                                alt="Remy Sharp"
                                src={user?.current_company?.logo[0].formats.thumbnail.url}/>
                            <Typography variant="subtitle2" gutterBottom >
                                {user?.current_company?.company_name}
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Paper>
            <ProfilePicModal
                img={user?.profile_pic?.url}
                user={user}
                show={showPicModal}
                onClose={()=>setShowPicModal(false)}/>
        </Wrapper>
    )
};

export default Profile
