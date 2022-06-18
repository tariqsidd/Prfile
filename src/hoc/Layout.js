import React, {useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { setError } from '../Redux/Slice/errorSlice';
import Header from "../components/Header";
import PopUpAlert from "../components/PopUpAlert";
import {getToken} from "../utils";

const Layout = ComposedComponent =>  {
    const EnhancedComponent = props => {
        const navigate = useNavigate();
        let token = getToken();
        const dispatch = useDispatch();
        const { error } = useSelector((state) => {
            return state.errorReducer
        });


        const navigateToLogIn = () => {
            console.log('props.path========>',props.path);

            token && !props.publicRoute ? navigate(props.path) : navigate('/auth')
        };

        useEffect(()=>{
            navigateToLogIn()
        },[]);

        return (
            <div>
                {token && <Header navigate={navigate}/>}
                <div style={{paddingTop:30}}>
                    <ComposedComponent navigate={navigate} />
                    {error?.show &&
                    <PopUpAlert
                        error={error.error}
                        show={error.show}
                        msg={error.errorMsg}
                        handleClose={()=>{dispatch(setError({error: false, show: false, errorMsg: ''}))}}/>}
                </div>
            </div>
        );
    };

    return EnhancedComponent;

};

export default Layout;


