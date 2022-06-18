import React,{useState} from 'react';
import Button from '@mui/material/Button';
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import {BootstrapDialog, BootstrapDialogTitle} from "../DialogComponents";
import ProfileServices from "../../services/profile";
import {setUser} from "../../Redux/Slice/userSlice";
import {useDispatch} from "react-redux";
import {InvalidChar} from '../../utils'
import Loader from '../Loader'
const EditProfile = ({show, onClose, user}) => {
    const dispatch = useDispatch();
    const [name, setName] = useState(user.name);
    const [age, setAge] = useState(user.age);
    const [location, setLocation] = useState(user.location);
    const [topSkills, setTopSkills] = useState(user.top_skills);
    const [loading, setLoading] = useState(false);

    const updateProfile = async ()=>{
        setLoading(true)
        let payload = {
            name,
            age,
            location,
            top_skills: topSkills
        };
        console.log('payload',payload);
        try {
            let {data: _user} = await ProfileServices.updateProfile(user.id,payload);
            dispatch(setUser(_user));
            setLoading(false);
            onClose();
        }
        catch (e) {
            setLoading(false)
        }

    };

    const validator = ()=>{
        return name ==='' || age ==='' || location==='' || topSkills ===''
    };

    const ageValidation = (type , age)=>{
        switch (type) {
            case 'invalidChar':
                return {
                    min: 0,
                    maxLength: 3,
                    onKeyDown: event => {
                        InvalidChar.includes(event.key) &&
                        event.preventDefault();
                    }
                };
            case 'checkFirstLetter':
                return age.length <= 1 && age === '0';

            default: return false
        }

    };

    return (
        <BootstrapDialog
            onClose={onClose}
            aria-labelledby="customized-dialog-title"
            open={show}>
            <Loader loading={loading}/>
            <BootstrapDialogTitle id="customized-dialog-title" onClose={onClose}>
                Update Profile
            </BootstrapDialogTitle>
            <DialogContent dividers>
                <Grid container spacing={2} alignItems='center'>
                    <Grid item xs={6}>
                        <TextField
                            required
                            fullWidth
                            value={name}
                            id="outlined-required"
                            label="Name"
                            onChange={(e)=> setName(e.target.value)}/>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            inputProps={ageValidation('invalidChar')}
                            required
                            fullWidth
                            value={age}
                            id="outlined-required"
                            label="Age"
                            onChange={(e)=> {
                                !ageValidation('checkFirstLetter', e.target.value) &&
                                setAge(e.target.value)

                            }}/>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            required
                            fullWidth
                            value={location}
                            id="outlined-required"
                            label="Location"
                            onChange={(e)=> setLocation(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            required
                            fullWidth
                            value={topSkills}
                            id="outlined-required"
                            label="Top Skills"
                            onChange={(e)=> setTopSkills(e.target.value)}/>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button disabled={validator()} autoFocus onClick={updateProfile}>
                    Update Profile
                </Button>
            </DialogActions>
        </BootstrapDialog>
    );
};

export default EditProfile
