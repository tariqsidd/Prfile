import React, {useState, useEffect} from "react";
import {Avatar, Box, Grid, IconButton, Paper, Typography} from "@mui/material";
import {styles} from "../styles";
import EditIcon from '@mui/icons-material/Edit';
import Wrapper from "../Wrapper";
import ProfilePicModal from "../profilePicModal";

const Profile = ({user, showEditFrom})=>{
    const [showPicModal, setShowPicModal] = useState(false);
    const [showGridCondition, setShowGridCondition] = useState(false);
    const [currentCompany, setCurrentCompany] = useState([]);
    console.log('showEditFrom',showEditFrom)
    const getCurrentCompany = (arr=[]) =>{
        return  arr.reduce(function(filtered, option) {
            if (option.current_company) {
                let newValues = { company_name: option.company_name, logo: option.logo, designation: option.designation };
                filtered.push(newValues);
            }
            return filtered;
        }, []);
    };
    useEffect(()=>{
        let company = getCurrentCompany(user.experience);
        setCurrentCompany(company[0]);
        setShowGridCondition(company?.length !==0)
    },[user]);


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
                    {showGridCondition?
                    <Grid item xs={4}>
                        <Box style={styles.logoCont} >
                            <Avatar
                                style={{marginRight:5}}
                                variant={'square'}
                                src={currentCompany?.logo?.url}/>
                            <Typography variant="subtitle2" gutterBottom >
                                {currentCompany?.company_name}
                            </Typography>
                        </Box>
                    </Grid> : null
                    }

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
