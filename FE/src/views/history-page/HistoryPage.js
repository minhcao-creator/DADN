// material-ui

// project imports
import MainCard from 'ui-component/cards/MainCard';
import { useEffect, useState } from 'react';
import apiWithToken from 'api/apiWithToken';

import HistoryTable from './HistoryTable';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';  
import Button from '@mui/material/Button';


// ==============================|| SAMPLE PAGE ||============================== //
const HistoryPage = () => {
    const [histories, setHistories] = useState([])
    const fetchGets = async () => {
        try {
            const response = await apiWithToken.get('/history',
            {
                page: '1'
            }
            );
            if(response?.data?.success){
                console.log(response.data)
                setHistories(response.data.histories);
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
    const handleDeleteHistory = async(id)=>{
        try {
            const response = await apiWithToken.delete(`/history/delete/${id}`);
          if (response?.data?.success){
            fetchGets()
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

    const deleteAllHistory = async()=>{
        denyDeleleAll()
        try {
            const response = await apiWithToken.delete('/history/delete-all');
          if (response?.data?.success){
            fetchGets()
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
    const [isAccept, setIsAccept] = useState(false);
    const acceptDeleleAll = () => {
        setIsAccept(true)
    }
    const denyDeleleAll = () => {
        setIsAccept(false)
    }

    const searchHistory = async(value)=>{
        try {
            const response = await apiWithToken.get(`/history/${value}`);
            if (response?.data?.success){
                setHistories(response.data.histories);
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

    return (   
        <MainCard title="SmartHome">
            <Dialog
                open={isAccept}
                onClose={denyDeleleAll}
                aria-labelledby="draggable-dialog-title"
                color="error"
            >
                <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                    Accept Delete All History
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure to want delete all history?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={denyDeleleAll} color="success">No</Button>
                    <Button onClick={deleteAllHistory} color="error">Yes</Button>
                </DialogActions>
            </Dialog>
            <HistoryTable 
                histories = {histories}  
                handleDelete = {handleDeleteHistory} 
                handleDeleteAll={acceptDeleleAll}
                handleSearch = {searchHistory}
            />
        </MainCard>
    )
}


export default HistoryPage;