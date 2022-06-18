import React, {useEffect, useState} from "react";
import ProfileServices from "../../services/profile";
import Wrapper from "../../components/Wrapper";
import ListItem from "../../components/ListItem";
const Profiles = (props) => {
    const [profiles, setProfiles] = useState([]);

    const getProfile = async () =>{
        try {
            let {data} = await ProfileServices.getProfiles();
            console.log('getProfile res=>',data)
            setProfiles(data)
        }
        catch (e) {
            console.log('getProfile Error=>',e)
        }

    };

    useEffect(()=>{
        getProfile()
    },[]);

    return(
        <Wrapper>
            {profiles.map((i, index)=>(
                <ListItem key={index} user={i}/>
            ))}
        </Wrapper>
    )
};
export default Profiles
