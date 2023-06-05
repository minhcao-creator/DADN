import { useEffect, useState } from 'react';
import { Grid, Typography } from '@mui/material';


const DateCard = () => {
    const [time, setTime] = useState(new Date());
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var amOrPm = (time.getHours() < 12) ? "AM" : "PM";
    var hours = (time.getHours() < 12) ? time.getHours() : time.getHours() - 12
    var minutes = String(time.getMinutes()).padStart(2, "0")
    var day = days[time.getDay()];
    var month = months[time.getMonth()]

    useEffect(() => {
        setInterval(() => setTime(new Date()), 1000);
    }, []);
    return (
        <Grid container spacing={10}>
            <Grid item>
                <Typography
                    sx={{
                        fontSize: '1.5rem',
                        fontWeight: 500,
                        mr: 1,
                        mt: 1.75,
                        mb: 0.75,
                        color: 'gray'
                    }}
                >
                    {hours}:{minutes} {amOrPm}
                </Typography>
            </Grid>
            <Grid item>
            <Typography
                    sx={{
                        fontSize: '1.5rem',
                        fontWeight: 500,
                        mr: 1,
                        mt: 1.75,
                        mb: 0.75,
                        color: 'gray'
                    }}
                >
                    {day}, {time.getDate()} {month}, {time.getFullYear()}
                </Typography>
            </Grid>
        </Grid>
        
    );
};

export default DateCard;
