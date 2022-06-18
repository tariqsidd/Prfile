import React, {useState} from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import {Avatar} from "@mui/material";
import ProfileServices from "../../services/profile";
import {setUser} from "../../Redux/Slice/userSlice";
import {useDispatch} from "react-redux";
import {BootstrapDialog, BootstrapDialogTitle} from "../DialogComponents";
import Loader from "../Loader";


BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
};

const ProfilePicModal = ({show, onClose, img='', user}) => {
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    console.log('user',user)

    const uploadImage = async () => {
        setLoading(true);
        const formData = new FormData();
        formData.append('files', image.file);
        try {
            let {data} = await ProfileServices.imageUpload(formData);
            let {data: _user} = await ProfileServices.updateProfile(user.id,{profile_pic: data[0]});
            console.log('updateImage Res', _user);
            dispatch(setUser(_user));
            setLoading(false);
            onClose()
        }
        catch (e) {
            setLoading(false);
            console.log('Error=>', e)
        }
    };

    const submit = ()=>{
        uploadImage();
    }

    return (
        <BootstrapDialog
            onClose={onClose}
            aria-labelledby="customized-dialog-title"
            open={show}>
            <Loader loading={loading} />
            <BootstrapDialogTitle id="customized-dialog-title" onClose={onClose}>
                Upload Picture
            </BootstrapDialogTitle>
            <DialogContent style={{justifyContent: 'center', alignItems:'cneter' , display:'flex'}} dividers>
                <Avatar
                    alt="Remy Sharp"
                    style={{width:200, height:200}}
                    src={image? image.imgUrl : img}/>
            </DialogContent>
            <DialogActions>
                <label htmlFor="select-image">
                    <Button color="primary" component="span">
                        Select Image
                    </Button>
                </label>
                <Button disabled={image===null} autoFocus onClick={submit}>
                    Upload Image
                </Button>
            </DialogActions>
            <input
                accept="image/*"
                type="file"
                id="select-image"
                style={{ display: 'none' }}
                onChange={e => {
                    console.log('files', e.target.files[0])
                    setImage({
                        file: e.target.files[0],
                        imgUrl:URL.createObjectURL(e.target.files[0])
                    })
                }}
            />
        </BootstrapDialog>
    );
};

export default ProfilePicModal
