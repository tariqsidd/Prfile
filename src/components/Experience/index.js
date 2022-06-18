import React, {useState} from "react";
import {Grid, IconButton, Paper, Typography} from "@mui/material";
import {styles} from "../styles";
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import ArrowBack from '@mui/icons-material/ArrowBack';
import List from "../List";
import EditExperience from "../EditExperience";

const Experience = ({data, editExp ,setEditExp})=>{
    const [editModal, setEditModal] = useState(false);
    const [expObject, setExpObject] =  useState({
        city:'',
        company_name:'',
        current_company:'',
        designation:'',
        full_time:'',
        start_date:'',
        end_date:'',
        logo:[]
    });

    const editExperience = (val) =>{
        setEditModal(true);
        setExpObject(val)
    };

    return(
        <Grid
            container
            spacing={2}
            justifyContent="center"
            alignItems="flex-start">
            <Grid item xs={6}>
                <Paper style={styles.expCont} elevation={3}>
                    <Grid
                        container
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center">
                        <Grid item style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
                            {
                                editExp &&
                                <IconButton onClick={()=>setEditExp(false)} style={{marginRight:10}} aria-label="delete">
                                    <ArrowBack fontSize={'medium'}/>
                                </IconButton>
                            }
                            <Typography variant="h5" gutterBottom component="div" style={{margin:0}}>
                                Experience
                            </Typography>
                        </Grid>
                        <Grid item>
                            {!editExp &&
                            <IconButton onClick={() => setEditModal(true)} aria-label="delete">
                                <AddIcon/>
                            </IconButton>
                            }
                            {!editExp &&
                            <IconButton onClick={()=>setEditExp(true)} aria-label="delete">
                                <EditIcon />
                            </IconButton>
                            }
                        </Grid>
                    </Grid>
                    <List
                        onClick={(val)=>{editExperience(val)}}
                        editExp={editExp}
                        data={data?.experience}
                    />
                    <EditExperience edit={editExp} user={data} onClose={()=>setEditModal(false)} show={editModal} expObject={expObject}/>
                </Paper>
            </Grid>
        </Grid>
    )
};

export default Experience
