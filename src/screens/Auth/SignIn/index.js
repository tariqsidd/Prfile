import React, {useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {Paper} from "@mui/material";
import Copyright from "../../../components/Copyright";
import AuthServices from "../../../services/auth";
import { useDispatch, useSelector } from 'react-redux';
import {setUser} from "../../../Redux/Slice/userSlice";
import {getToken, setToken} from "../../../utils";

const  SignIn =  ({setView, navigate}) => {
    const dispatch = useDispatch();
    const [error, setError] = useState({userNameError: false, passwordError:false, apiError: false});

    const formValidation = (data)=>{
        let {identifier, password} = data;
        return identifier !=='' && password !==''
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        let payload = {
            identifier: data.get('username'),
            password: data.get('password'),
        };
        if(formValidation(payload)){
            try {
                let {data} = await AuthServices.login(payload);
                console.log('login Res',data);
                dispatch(setUser(data.user.profile));
                setToken(data.jwt);
                console.log('TOKEN', getToken())
                navigate('/')
            }
            catch (e) {
                console.log('login Res',e.message);
                setError({
                    userNameError: !data.get('username'),
                    passwordError: !data.get('password')
                })
            }
        }
        else{
            setError({
                userNameError: !data.get('username'),
                passwordError: !data.get('password')
            })
        }
    };
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Paper style={{flex:1, padding:20}} elevation={3}>
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="User Name"
                            name="username"
                            autoFocus
                            error={error.userNameError}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            error={error.passwordError}
                            autoComplete="current-password"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link onClick={()=>setView('sign-up')} variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Paper>
        </Container>
    );
}

export default SignIn
