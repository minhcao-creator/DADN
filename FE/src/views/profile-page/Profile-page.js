import { Grid, Divider, Typography} from "@mui/material";
import Button from '@mui/material/Button';
import Dialog from'@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from "@mui/material/DialogContent";
import AnimateButton from 'ui-component/extended/AnimateButton';
import { 
    Box,
    FormControl,
    InputLabel,
    FormControlLabel,
    FormHelperText, 
    OutlinedInput,
    Checkbox,
} from "@mui/material";
import { gridSpacing } from 'store/constant';

import { Form, Formik , Field} from 'formik';
import * as Yup from 'yup';
import Snackbar from '@mui/material/Snackbar';

import avatar from 'assets/images/users/rem.png'

// project imports
import { useTheme } from '@mui/material/styles';
import MainCard from 'ui-component/cards/MainCard';
import apiWithToken from "api/apiWithToken";
import { useState } from "react";
import { useEffect } from "react";
import React from "react";
import useScriptRef from "hooks/useScriptRef";


const Profile = () => {
    const theme = useTheme();
    const scriptedRef = useScriptRef;

    const [user, setUser] = useState(
        {
            "name": "",
            "email": "",
            "address": "",
            "age": "",
            "gender":"",
            "phone": ""
        }
    )

    const [open, setOpen] = useState(false);
    const [isSubmitionCompleted, setSubmitionCompleted] = useState(false);

    const getUser = async () => {
        try {
            const response = await apiWithToken.get('/profile');
            setUser(response.data.user)
        } catch (err){
            if(err.response){
                console.log(err.response.data);
                console.log(err.response.status);
                console.log(err.response.headers);
            }
            else {
                console.log(`Error: ${err.message}`);
            }
        }
    }
    useEffect(() => {
        getUser();
    }, [])

    const handleCloseDialog = () => {
        setOpen(false);
    }

    const handleClickButton = () => {
        setSubmitionCompleted(false);
        setOpen(true);
    }


    const [alert, setAlert] = useState(false)
    const handleCloseSnackbarSuccess = (event, reason) => {
        
        if (reason === 'clickaway') {
            return;
        }
        setAlert(false);
    }
    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/


    return (
        <MainCard title="User Profile">
            <Grid container spacing={gridSpacing}>
                <Snackbar
                    open={alert}
                    autoHideDuration={3000}
                    message="Update profile success"
                    onClose={handleCloseSnackbarSuccess}
                />
                <Grid item xs={12} sx={{mt: 3 }}>
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs>
                            <img src={avatar} alt = '' width='50%'/>
                        </Grid>
                        <Divider orientation="vertical" flexItem></Divider>
                        <Grid item xs>
                            <Grid container spacing={gridSpacing}>
                                <Grid item xs = {12}>
                                    <Typography variant="h2">
                                        {user.name}
                                    </Typography>
                                </Grid>
                                <Grid item xs = {12}>
                                    <Typography>
                                        {user.email}
                                    </Typography>
                                </Grid>
                                <Grid item xs = {12}>
                                    <Typography>
                                    {user.phone}
                                    </Typography>
                                </Grid>
                                <Grid item xs ={12}>
                                    <Button variant="outlined" color="primary" onClick={handleClickButton}>Update Profile</Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>

                <Dialog
                    open = {open}
                    onClose={handleCloseDialog}
                >
                    {!isSubmitionCompleted && (
                        <React.Fragment>
                            <DialogTitle variant="h2">Update profile</DialogTitle>
                            <DialogContent>
                                <Formik
                                    initialValues={{
                                        name: user.name,
                                        phone: user.phone,
                                        email: user.email,
                                        age: user.age,
                                        gender: user.gender,
                                        address:user.address,
                                        submit: null
                                    }}
                                    validationSchema={Yup.object().shape({
                                        email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
                                        phone: Yup.string().required('Phone is requied').matches(phoneRegExp, 'Phone number is not valid'),
                                        name: Yup.string().max(255, "Too long").required('Name is required'),
                                        age: Yup.number().typeError('Must be a number').required('Age is required').min(0,"Are you existing?"),
                                        address: Yup.string().required('Address is required').max(255, 'Too long') ,
                                        gender: Yup.string().required('Gender is required')
                                    })}
                                    onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                                        try {
                                            const response = await apiWithToken.put('update-profile',
                                            {
                                                name: values.name,
                                                phone: values.phone,
                                                email: values.email,
                                                age: Number(values.age),
                                                gender: values.gender,
                                                address: values. address
                                            }
                                            )
                    
                                            if (scriptedRef.current) {
                                                setStatus({ success: true });
                                                setSubmitting(false);
                                            }
                                            if(response?.data?.success == true){
                                                handleCloseDialog()
                                                getUser()
                                                setAlert(true)
                                            }
                                        } catch (err) {
                                            console.error(err);
                                            if (scriptedRef.current) {
                                                setStatus({ success: false });
                                                setErrors({ submit: err.response.data.message });
                                                setSubmitting(false);
                                            }
                                        }
                                    }}
                                >
                                    {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                                        <form noValidate onSubmit={handleSubmit}>
                                            <FormControl fullWidth error={Boolean(touched.name && errors.name)} sx={{ ...theme.typography.customInput }}>
                                                <InputLabel htmlFor="outlined-adornment-phone-register">Name</InputLabel>
                                                <OutlinedInput
                                                    id="outlined-adornment-phone-register"
                                                    type="text"
                                                    value={values.name}
                                                    name="name"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    inputProps={{}}
                                                />
                                                {touched.name && errors.name && (
                                                    <FormHelperText error id="standard-weight-helper-text--register">
                                                        {errors.name}
                                                    </FormHelperText>
                                                )}
                                            </FormControl>

                                            <FormControl fullWidth error={Boolean(touched.phone && errors.phone)} sx={{ ...theme.typography.customInput }}>
                                                <InputLabel htmlFor="outlined-adornment-phone-register">Phone</InputLabel>
                                                <OutlinedInput
                                                    id="outlined-adornment-phone-register"
                                                    type="text"
                                                    value={values.phone}
                                                    name="phone"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    inputProps={{}}
                                                />
                                                {touched.phone && errors.phone && (
                                                    <FormHelperText error id="standard-weight-helper-text--register">
                                                        {errors.phone}
                                                    </FormHelperText>
                                                )}
                                            </FormControl>

                                            <FormControl fullWidth error={Boolean(touched.email && errors.email)} sx={{ ...theme.typography.customInput }}>
                                                <InputLabel htmlFor="outlined-adornment-email-register">Email Address / Username</InputLabel>
                                                <OutlinedInput
                                                    id="outlined-adornment-email-register"
                                                    type="email"
                                                    value={values.email}
                                                    name="email"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    inputProps={{}}
                                                />
                                                {touched.email && errors.email && (
                                                    <FormHelperText error id="standard-weight-helper-text--register">
                                                        {errors.email}
                                                    </FormHelperText>
                                                )}
                                            </FormControl>

                                            <FormControl fullWidth error={Boolean(touched.age && errors.age)} sx={{ ...theme.typography.customInput }}>
                                                <InputLabel htmlFor="outlined-adornment-age-register">Age</InputLabel>
                                                <OutlinedInput
                                                    id="outlined-adornment-age-register"
                                                    type="text"
                                                    value={values.age}
                                                    name="age"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    inputProps={{}}
                                                />
                                                {touched.age && errors.age && (
                                                    <FormHelperText error id="standard-weight-helper-text--register">
                                                        {errors.age}
                                                    </FormHelperText>
                                                )}
                                            </FormControl>

                                            <Grid container alignItems="center" justifyContent="space-between">
                                                <Grid item>
                                                    <InputLabel htmlFor="outlined-adornment-age-register">Gender</InputLabel>
                                                </Grid>
                                                <Grid item>
                                                    <FormControl fullWidth error={Boolean(touched.gender && errors.gender)} sx={{ ...theme.typography.customInput }}>
                                                    <label>
                                                    <Field type="radio" name="gender" value="male" />
                                                    Male
                                                    </label>
                                                    <label>
                                                    <Field type="radio" name="gender" value="female" />
                                                    Female
                                                    </label>
                                                    </FormControl>
                                                </Grid>
                                                <Grid item>
                                                {touched.gender && errors.gender && (
                                                    <FormHelperText error id="standard-weight-helper-text--register">
                                                        {errors.gender}
                                                    </FormHelperText>
                                                )}
                                                </Grid>
                                            </Grid>

                                            <FormControl fullWidth error={Boolean(touched.address && errors.address)} sx={{ ...theme.typography.customInput }}>
                                                <InputLabel htmlFor="outlined-adornment-address-register">Address</InputLabel>
                                                <OutlinedInput
                                                    id="outlined-adornment-address-register"
                                                    type="text"
                                                    value={values.address}
                                                    name="address"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    inputProps={{}}
                                                />
                                                {touched.address && errors.address && (
                                                    <FormHelperText error id="standard-weight-helper-text--register">
                                                        {errors.address}
                                                    </FormHelperText>
                                                )}
                                            </FormControl>

                                            {errors.submit && (
                                                <Box sx={{ mt: 3 }}>
                                                    <FormHelperText error>{errors.submit}</FormHelperText>
                                                </Box>
                                            )}

                                        
                                            <Box 
                                                sx={{ mt: 2 }}
                                            >
                                                <AnimateButton>
                                                    <Button
                                                        disableElevation
                                                        disabled={isSubmitting}
                                                        
                                                        size="large"
                                                        type="submit"
                                                        variant="contained"
                                                        color="secondary"
                                                    >
                                                        Update
                                                    </Button>
                                                </AnimateButton>
                                            </Box>
                                        </form>
                                    )}
                                </Formik>
                            </DialogContent>
                        </React.Fragment>
                    )}
                </Dialog>
            </Grid>
        </MainCard>


    )
}

export default Profile;