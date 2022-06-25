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
import auth from "../../../services/auth";
import {setUser} from "../../../Redux/Slice/userSlice";
import {setToken} from "../../../utils";
import {useDispatch} from "react-redux";
import profile from "../../../services/profile";

export default function SignUp({setView, navigate}) {
    const dispatch = useDispatch();
    const [error, setError] = useState({
        email: false,
        firstName:false,
        lastName:false,
        password:false
    });

    const formValidation = (data)=>{
        let {email, firstName, lastName, password, confirmPassword} = data;
        setError({
            email: email ==='',
            firstName: firstName ==='',
            lastName: lastName ==='',
            password: password ==='' || (password !== confirmPassword)
        });
        return email !=='' && firstName !=='' && lastName !=='' && password === confirmPassword
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            username: `${data.get('firstName')} ${data.get('lastName')}`,
            email: data.get('email'),
            password: data.get('password'),
        });
        let payload = {
            email: data.get('email'),
            firstName: data.get('firstName'),
            lastName: data.get('lastName'),
            password: data.get('password'),
            confirmPassword: data.get('confirmPassword'),
        };
        if(formValidation(payload)){
            let payload = {
                username: `${data.get('firstName')} ${data.get('lastName')}`,
                email:  data.get('email'),
                password: data.get('password'),
            };
            try {
                let {data} = await auth.register(payload);
                console.log('registerData', data)
                setToken(data.jwt);
                let res = await profile.createProfiles({user:data.user.id, name: data.user.username});
                dispatch(setUser(res.data));
                setToken(data.jwt);
                navigate('/')
            }
            catch (e) {
                console.log('Register Err',e.message);
            }
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
                    }}>
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="given-name"
                                    name="firstName"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    error={error.firstName}
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    error={error.lastName}
                                    autoComplete="family-name"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email"
                                    name="email"
                                    error={error.email}
                                    autoComplete="family-name"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    error={error.password}
                                    autoComplete="new-password"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="confirmPassword"
                                    label="Confirm Password"
                                    type="password"
                                    id="confirmPassword"
                                    error={error.password}
                                    autoComplete="new-password"
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link onClick={()=>setView('sign-in')} variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 5 }} />
                </Paper>
            </Container>
    );
}
