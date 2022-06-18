import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";

const IsAuthenticate = ComposedComponent =>  {
    const EnhancedComponent = props => {
        const navigate = useNavigate();
        let token = localStorage.getItem('auth-token');
        const isLogIn = () => {
            token && navigate('/')
        };

        useEffect(() => {
            isLogIn()
        }, []);

        return (<ComposedComponent navigate={navigate}/>)
    }
    return EnhancedComponent;
};

export default IsAuthenticate;
