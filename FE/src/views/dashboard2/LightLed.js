import PropTypes from 'prop-types';

// material-ui
import { styled} from '@mui/material/styles';
import { Box, Button, Grid, Typography } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import SkeletonDashboardCard from 'ui-component/cards/Skeleton/SkeletonDashboardCard';
import { useEffect } from 'react';
import { useState } from 'react';
import theme from 'themes';

// assets
const RedCardWrapper = styled(MainCard)(({ theme }) => ({
    backgroundColor: "white",
    overflow: 'hidden',
    position: 'relative',
    '&:after': {
        content: '""',
        position: 'absolute',
        width: 210,
        height: 210,
        background: theme.palette.error.main,
        borderRadius: '50%',
        top: -85,
        right: -95,
        [theme.breakpoints.down('sm')]: {
            top: -105,
            right: -140
        }
    },
    '&:before': {
        content: '""',
        position: 'absolute',
        width: 210,
        height: 210,
        background: theme.palette.error.main,
        borderRadius: '50%',
        top: -125,
        right: -15,
        opacity: 0.5,
        [theme.breakpoints.down('sm')]: {
            top: -155,
            right: -70
        }
    }
}));

const GreenCardWrapper = styled(MainCard)(({ theme }) => ({
    backgroundColor: "white",
    overflow: 'hidden',
    position: 'relative',
    '&:after': {
        content: '""',
        position: 'absolute',
        width: 210,
        height: 210,
        background: theme.palette.success.main,
        borderRadius: '50%',
        top: -85,
        right: -95,
        [theme.breakpoints.down('sm')]: {
            top: -105,
            right: -140
        }
    },
    '&:before': {
        content: '""',
        position: 'absolute',
        width: 210,
        height: 210,
        background: theme.palette.success.main,
        borderRadius: '50%',
        top: -125,
        right: -15,
        opacity: 0.5,
        [theme.breakpoints.down('sm')]: {
            top: -155,
            right: -70
        }
    }
}));


// ===========================|| DASHBOARD DEFAULT - EARNING CARD ||=========================== //

const LightCard = ({ isLoading, led, handleClick}) => {
    const [ledStatus, setLedStatus] = useState("ERROR");
    const [colorCard, setColorCard] = useState();
    useEffect(()=>{
        if (led == 1) {
            setLedStatus("ON");
            //setColorCard(theme.palette.error.light)
        }
        else if (led == 0) {
            setLedStatus("OFF");
            //setColorCard(theme.palette.primary.light)
        }
        else {
            setLedStatus("ERROR")
        }
    })

    if(ledStatus == "ON")
        return (
            <>
                {isLoading ? (
                    <SkeletonDashboardCard />
                ) : (
                    <RedCardWrapper border={false} content={false}
                    >
                        <Box sx={{ p: 2.25 }}>
                            <Grid container direction="column">
                                <Grid item>
                                    <Grid container alignItems="center">
                                        <Grid item>
                                            <Typography 
                                                sx={{ 
                                                    fontSize: '1.5rem', 
                                                    fontWeight: 500, 
                                                    mr: 1, mt: 1.75, mb: 0.75 ,
                                                    color: 'black'
                                                }}
                                            >
                                                LIGHT
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                {/* <Grid item sx={{ mb: 1.25 }}>
                                    <Typography
                                        sx={{
                                            fontSize: '2rem',
                                            fontWeight: 500,
                                            mr: 1, mb: 5 ,
                                            color: 'black'
                                        }}
                                    >
                                        {ledStatus}
                                    </Typography>
                                </Grid> */}
                                <Grid item sx={{ mt: 4.25,mb: 2}}>
                                <Button
                                type="submit"
                                variant="outlined"          
                                color="error"
                                size='large'            
                                style={{fontSize:'1rem',
                                        minWidth: '70px'}}

                                onClick={handleClick}
                                >
                                    TURN OFF
                                </Button>
                            </Grid>
                            </Grid>
                        </Box>
                    </RedCardWrapper>
                )}
            </>
        );
    else {
        return (
            <>
                {isLoading ? (
                    <SkeletonDashboardCard />
                ) : (
                    <GreenCardWrapper border={false} content={false}
                    >
                        <Box sx={{ p: 2.25 }}>
                            <Grid container direction="column">
                                <Grid item>
                                    <Grid container alignItems="center">
                                        <Grid item>
                                            <Typography 
                                                sx={{ 
                                                    fontSize: '1.5rem', 
                                                    fontWeight: 500, 
                                                    mr: 1, mt: 1.75, mb: 0.75 ,
                                                    color: 'black'
                                                }}
                                            >
                                                LIGHT
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                {/* <Grid item sx={{ mb: 1.25 }}>
                                    <Typography
                                        sx={{
                                            fontSize: '2rem',
                                            fontWeight: 500,
                                            mr: 1, mb: 5 ,
                                            color: 'black'
                                        }}
                                    >
                                        {ledStatus}
                                    </Typography>
                                </Grid> */}
                                <Grid item sx={{ mt: 4.25,mb: 2}}>
                                <Button
                                type="submit"
                                variant="outlined"          
                                color="success"
                                size='large'            
                                style={{fontSize:'1rem',
                                        minWidth: '70px'}}

                                onClick={handleClick}
                                >
                                    TURN ON
                                </Button>
                            </Grid>
                            </Grid>
                        </Box>
                    </GreenCardWrapper>
                )}
            </>
        );
    }
};

LightCard.propTypes = {
    isLoading: PropTypes.bool
};

export default LightCard;
