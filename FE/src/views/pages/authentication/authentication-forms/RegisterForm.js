import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
    Box,
    Button,
    Checkbox,
    Divider,
    FormControl,
    FormControlLabel,
    FormHelperText,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    TextField,
    Typography,
    useMediaQuery
} from '@mui/material';

// third party
import * as Yup from 'yup';
import { Form, Formik , Field} from 'formik';

// project imports
import useScriptRef from 'hooks/useScriptRef';
import Google from 'assets/images/icons/social-google.svg';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { strengthColor, strengthIndicator } from 'utils/password-strength';

// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import Snackbar from '@mui/material/Snackbar';
import api from 'api/api';

// ===========================|| FIREBASE - REGISTER ||=========================== //

const FirebaseRegister = ({ ...others }) => {
    const theme = useTheme();
    const scriptedRef = useScriptRef();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
    const customization = useSelector((state) => state.customization);
    const [showPassword, setShowPassword] = useState(false);
    const [checked, setChecked] = useState(true);

    const [strength, setStrength] = useState(0);
    const [level, setLevel] = useState();

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const changePassword = (value) => {
        const temp = strengthIndicator(value);
        setStrength(temp);
        setLevel(strengthColor(temp));
    };

    useEffect(() => {
        changePassword('123456');
    }, []);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setAlert(false);
      };

    const [alert, setAlert] = useState(false)

    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

    return (
        <>
            <Snackbar
                open={alert}
                autoHideDuration={3000}
                message="Register success"
                onClose={handleClose}
            />
            <Formik
                initialValues={{
                    name: '',
                    phone: '',
                    email: '',
                    password: '',
                    age: '',
                    gender:'',
                    address:'',
                    submit: null
                }}
                validationSchema={Yup.object().shape({
                    email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
                    phone: Yup.string().required('Phone is requied').matches(phoneRegExp, 'Phone number is not valid'),
                    name: Yup.string().max(255, "Too long").required('Name is required'),
                    password: Yup.string().max(255).required('Password is required'),
                    age: Yup.number().typeError('Must be a number').required('Age is required').min(0,"Are you existing?"),
                    address: Yup.string().required('Address is required').max(255, 'Too long') ,
                    gender: Yup.string().required('Gender is required')
                })}
                onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                    try {
                        const response = await api.post('register',
                        {
                            name: values.name,
                            phone: values.phone,
                            email: values.email,
                            password: values.password,
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
                    <form noValidate onSubmit={handleSubmit} {...others}>
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

                        <FormControl
                            fullWidth
                            error={Boolean(touched.password && errors.password)}
                            sx={{ ...theme.typography.customInput }}
                        >
                            <InputLabel htmlFor="outlined-adornment-password-register">Password</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password-register"
                                type={showPassword ? 'text' : 'password'}
                                value={values.password}
                                name="password"
                                label="Password"
                                onBlur={handleBlur}
                                onChange={(e) => {
                                    handleChange(e);
                                    changePassword(e.target.value);
                                }}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                            size="large"
                                        >
                                            {showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                inputProps={{}}
                            />
                            {touched.password && errors.password && (
                                <FormHelperText error id="standard-weight-helper-text-password-register">
                                    {errors.password}
                                </FormHelperText>
                            )}
                        </FormControl>

                        {strength !== 0 && (
                            <FormControl fullWidth>
                                <Box sx={{ mb: 2 }}>
                                    <Grid container spacing={2} alignItems="center">
                                        <Grid item>
                                            <Box
                                                style={{ backgroundColor: level?.color }}
                                                sx={{ width: 85, height: 8, borderRadius: '7px' }}
                                            />
                                        </Grid>
                                        <Grid item>
                                            <Typography variant="subtitle1" fontSize="0.75rem">
                                                {level?.label}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </FormControl>
                        )}

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

                        <Grid container alignItems="center" justifyContent="space-between">
                            <Grid item>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={checked}
                                            onChange={(event) => setChecked(event.target.checked)}
                                            name="checked"
                                            color="primary"
                                        />
                                    }
                                    label={
                                        <Typography variant="subtitle1">
                                            Agree with &nbsp;
                                            <Typography variant="subtitle1" component={Link} to="#">
                                                Terms & Condition.
                                            </Typography>
                                        </Typography>
                                    }
                                />
                            </Grid>
                        </Grid>
                        {errors.submit && (
                            <Box sx={{ mt: 3 }}>
                                <FormHelperText error>{errors.submit}</FormHelperText>
                            </Box>
                        )}

                        <Box sx={{ mt: 2 }}>
                            <AnimateButton>
                                <Button
                                    disableElevation
                                    disabled={isSubmitting}
                                    fullWidth
                                    size="large"
                                    type="submit"
                                    variant="contained"
                                    color="secondary"
                                >
                                    Sign up
                                </Button>
                            </AnimateButton>
                        </Box>
                    </form>
                )}
            </Formik>
        </>
    );
};

export default FirebaseRegister;
