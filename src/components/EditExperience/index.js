import React,{useState, useEffect} from 'react';
import Button from '@mui/material/Button';
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import {BootstrapDialog, BootstrapDialogTitle} from "../DialogComponents";
import Box from "@mui/material/Box";
import moment from "moment";
import {Avatar} from "@mui/material";
import ProfileServices from "../../services/profile";
import {setUser} from "../../Redux/Slice/userSlice";
import {useDispatch} from "react-redux";
import Loader from '../Loader'
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";
const EditExperience = ({show=false, onClose=()=>{}, expObject, user, edit})=>{
    const dispatch = useDispatch();
    const [city, setCity] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [designation, setDesignation] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [currentCompany, setCurrentCompany] = useState(true);
    const [loading, setLoading] = useState(false);
    const [logo, setLogo] = useState({file:[], imageUrl:''});

    const getFormValues = ()=>{
        console.log('getFormValues')
        let startDateValue = expObject.start_date !=='' ?
            moment(expObject.start_date).format("YYYY-MM-DD") :
            moment(new Date()).format("YYYY-MM-DD");

        let endDateValue = expObject.hasOwnProperty('end_date')  ?
            moment(expObject.end_date).format("YYYY-MM-DD") :
            '';

        setCity(expObject.city);
        setCurrentCompany(expObject.current_company)
        setCompanyName(expObject.company_name);
        setDesignation(expObject.designation);
        setStartDate(startDateValue);
        setEndDate(endDateValue);
        setLogo({file: [], imageUrl:expObject?.logo?.url})
    };

    useEffect(()=>{
        edit && getFormValues()
    },[expObject, edit]);

    const closeModal = () =>{
        setCity('');
        setCompanyName('');
        setDesignation('');
        setStartDate('');
        setEndDate('');
        setLogo({file: [], imageUrl:''});
        onClose()
    };

    const updateExperience = async ()=>{
        setLoading(true);
        let expArr = [...user.experience];
        let updatedExp = {
            city,
            designation,
            ...(edit && {id: expObject.id}),
            current_company: currentCompany,
            end_date: currentCompany? new Date() : endDate,
            start_date:startDate,
            company_name: companyName,
        };

        let selectedExpIndex = user.experience.findIndex((i)=> expObject.id===i.id);
        let payload = {
            experience: expArr,
        };
        edit? expArr[selectedExpIndex] = updatedExp : expArr.unshift(updatedExp);
        if(logo.file.length !==0){
            try {
                const formData = new FormData();
                formData.append('files', logo.file[0]);
                let {data} = await ProfileServices.imageUpload(formData);
                expArr[edit ? selectedExpIndex : 0] = {...updatedExp, logo:data[0]};
                let res = await ProfileServices.updateProfile(user.id, payload);
                dispatch(setUser(res.data));
                setLoading(false)
                closeModal()
            }
            catch (e) {
                setLoading(false)
                console.log('updateProfile Error',e)
            }

        }
        else {
            try {
                let res = await ProfileServices.updateProfile(user.id, payload);
                console.log('updateProfile res', res)
                dispatch(setUser(res.data));
                setLoading(false)
                closeModal()
            }
            catch (e) {
                setLoading(false)
                console.log('updateProfile Error',e)
            }
        }
    };

    const validator = ()=>{
        if(edit && expObject.current_company){
            return city === '' ||
                companyName === '' ||
                designation === '' ||
                startDate === ''
        }
        if(edit && !expObject.current_company){
            return city === '' ||
                companyName === '' ||
                designation === '' ||
                startDate === '' ||
                endDate === ''
        }
        return city === '' ||
            companyName === '' ||
            designation === '' ||
            startDate === '' ||
            logo.file.length ===0

    };


    return(
        <BootstrapDialog
            onClose={closeModal}
            aria-labelledby="customized-dialog-title"
            open={show}
        >
            <Loader loading={loading}/>
            <BootstrapDialogTitle id="customized-dialog-title" onClose={closeModal}>
                Update Experience
            </BootstrapDialogTitle>
            <DialogContent dividers style={{padding:0}}>
                <Box style={{display:'flex', flex:1, margin:10,marginBottom:15, justifyContent:'center', alignItems:'center'}}>
                    <label htmlFor="select-image">
                    <Avatar
                        alt="Remy Sharp"
                        style={{width:100, height:100}}
                        src={logo?.imageUrl}/>
                    </label>
                    <input
                        accept="image/*"
                        type="file"
                        id="select-image"
                        style={{ display: 'none' }}
                        onChange={e => {
                            console.log('files', e.target.files[0])
                            setLogo({
                                file: e.target.files,
                                imageUrl: URL.createObjectURL(e.target.files[0])
                            })
                        }}
                    />
                </Box>
                <Box style={{display:'flex', flex:1, margin:10}}>
                    <TextField
                        required
                        fullWidth
                        id="outlined-required"
                        label="City"
                        value={city}
                        style={{marginRight:5 }}
                        onChange={(e)=> {setCity(e.target.value)}}/>
                    <TextField
                        required
                        fullWidth
                        id="outlined-required"
                        label="Company Name"
                        value={companyName}
                        style={{marginLeft:5}}
                        onChange={(e)=> {setCompanyName(e.target.value)}}/>
                </Box>
                <Box style={{display:'flex', flex:1, margin:10}}>
                    <TextField
                        required
                        fullWidth
                        id="outlined-required"
                        label="Designation"
                        value={designation}
                        style={{marginRight:5 }}
                        onChange={(e)=> {setDesignation(e.target.value)}}/>
                </Box>
                <Box style={{display:'flex', flex:1, margin:10, alignItems:'center'}}>
                    <Checkbox checked={currentCompany? true: false} onChange={(e,v)=>{setCurrentCompany(v)}}/>
                    <Typography variant="subtitle1">
                        I am currently working in this role
                    </Typography>

                </Box>
                <Box style={{display:'flex', flex:1, margin:10}}>
                    <TextField
                        required
                        fullWidth
                        id="outlined-required"
                        type={'date'}
                        value={startDate}
                        helperText='Start Date'
                        style={{marginRight:5}}
                        onChange={(e)=> {setStartDate(e.target.value)}}/>
                    <TextField
                        required
                        fullWidth
                        id="outlined-required"
                        disabled={currentCompany}
                        value={endDate}
                        type={'date'}
                        helperText="End Date"
                        style={{marginLeft:5}}
                        onChange={(e)=> {setEndDate(e.target.value)}}
                    />
                </Box>
            </DialogContent>
            <DialogActions>
                <Button disabled={validator()} autoFocus onClick={updateExperience}>
                    {
                        edit ? 'Update Experience' : 'Add Experience'
                    }
                </Button>
            </DialogActions>
        </BootstrapDialog>
    )
};

export default EditExperience
