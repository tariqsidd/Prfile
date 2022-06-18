import React,{useEffect, useState} from "react";

import {Box} from '@mui/material';
import Profile from "../../components/Profile";
import Experience from "../../components/Experience";
import {useParams} from "react-router-dom";
import ProfileServices from "../../services/profile";
import { useDispatch, useSelector } from 'react-redux';
import EditProfile from "../../components/EditProfile";

const MyProfile = (props) => {
    // let { id } = useParams(), userID =  id.substr(3);
    const [profile, setProfile] = useState({});
    const [showEditFrom, setShowEditFrom] = useState(false);
    const [editExp, setEditExp] = useState(false);

    const { user } = useSelector((state) => {
        return state.userReducer
    });


    const getUserProfile = async ()=>{
        // console.log('user.id', id)
        // try {
        //     let {data} = await ProfileServices.getProfile(userID);
        //     console.log('getUserProfile Res=>', data);
        //     setProfile(data)
        // }
        // catch (e) {
        //     console.log('getUserProfile Error=>', e)
        // }
    };

    // console.log('profile==>', profile)

    // useEffect(()=>{
    //     getUserProfile()
    // },[]);

    return(
        <Box>
            <Profile showEditFrom={()=>setShowEditFrom(true)} user={user}/>
            <Experience editExp={editExp} setEditExp={setEditExp} data={user}/>
            <EditProfile user={user} show={showEditFrom} onClose={()=>setShowEditFrom(false)}/>
        </Box>
    )
};
export default MyProfile
