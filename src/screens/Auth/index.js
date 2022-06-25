import React, {useEffect, useState} from "react";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import {isLoggedIn} from "../../utils";

const Auth = ({navigate})=>{
    const [view, setView] = useState('sign-in');

    useEffect(()=>{
        isLoggedIn() && navigate('/')
    });
    return(
        view === 'sign-in' ?
            <SignIn navigate={navigate} setView={setView}/> :
            <SignUp navigate={navigate} setView={setView}/>
    )
};

export default Auth
