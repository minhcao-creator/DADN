import { Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import { gridSpacing } from 'store/constant';
//import api from '../../api/api'
import apiWithToken from 'api/apiWithToken';

// material-ui

// project imports
import DoorCard from './DoorCard';
import AlarmCard from './Alarm';
import LightCard from './LightLed';
import StatusCard from './Status';
import DateCard from './DateCard';
import HistoryTable from './HistoryTable';
import { any } from 'prop-types';

// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
    const [isLoading, setLoading] = useState(true);
    const [statusDevice, setStatusDevice] = useState({"led": "", "buzzer": "", "sensor" : ""});
    const [ledStatus, setLedStatus] = useState("")
    const [buzzerStatus, setBuzzerStatus] = useState("")
    const [sensorStatus, setSenSorStatus] = useState("")
    const [systemStatus, setSystemStatus] = useState("")
    const [histories, setHistories] = useState([])

    useEffect(() => {
        setLoading(false);
    }, []);

    const fetchGets = async () => {
        try {
            const response = await apiWithToken.get('/status');
            if(response?.data?.success){
                console.log(response.data)
                setStatusDevice(response.data.data);
                setSystemStatus(response.data.signal);
            }
            const history = await apiWithToken.get('/history')
            if(history?.data?.success){
                console.log(history.data)
                setHistories(history.data.histories);
            }
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
        fetchGets();
    }, [])
    
    useEffect(() => {
        setLedStatus(statusDevice.led)
        setBuzzerStatus(statusDevice.buzzer)
        setSenSorStatus(statusDevice.sensor)
        setSystemStatus(systemStatus)
    }, [statusDevice, systemStatus])
    
    const clickTurnOffAlarm = async () => {
        try{
            const response = await apiWithToken.post('/status/buzzer',{
                "message": "0"
            })
            if(response?.data?.success){
                setTimeout(() => fetchGets(), 500);
                //fetchGets()
            }
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

    const clickButtonSystem = async () => {
        try {
            const response = await apiWithToken.get('/status/change')
            if(response?.data?.success){
                setTimeout(() => fetchGets(), 500)
            }
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

    const clickButtonLed = async () => {
        if(statusDevice.led == 1){
            try {
                const response = await apiWithToken.post('/status/led',{
                    message: "0"
                })
                if(response?.data?.success){
                    setTimeout(() => fetchGets(), 500)
                }
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
        else {
            try {
                const response = await apiWithToken.post('/status/led',{
                    message: "1"
                })
                if(response?.data?.success){
                    setTimeout(() => fetchGets(), 500)
                }
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
    }

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <Grid
                    container
                    spacing={gridSpacing}
                    sx={{
                        mt: 0
                    }}
                >
                    <Grid item lg={3} md={6} sm={6} xs={12}>
                        <DoorCard isLoading={isLoading} sensor={sensorStatus} />
                    </Grid>
                    <Grid item lg={3} md={6} sm={6} xs={12}>
                        <AlarmCard isLoading={isLoading} buzzer={buzzerStatus} handleClickTurnOff={clickTurnOffAlarm}/>
                    </Grid>
                    <Grid item lg={3} md={6} sm={6} xs={12}>
                        <LightCard isLoading={isLoading} led={ledStatus} handleClick={clickButtonLed}/>
                    </Grid>
                    <Grid item lg={3} md={6} sm={6} xs={12}>
                        <StatusCard isLoading={isLoading} statusDevice={systemStatus} handleClick={clickButtonSystem}/>
                    </Grid>
                </Grid>
                <Grid
                    container
                    justifyContent="center"
                    spacing={gridSpacing}
                    sx={{
                        mt: 1
                    }}
                >
                    <Grid item>
                        <DateCard />
                    </Grid>
                </Grid>
            </Grid>
            <Grid 
                item xs={12} 
                sx={{
                    mt: 2
                }}
            >
                <HistoryTable histories = {histories}/>
            </Grid>
        </Grid>
    );
};

export default Dashboard;
