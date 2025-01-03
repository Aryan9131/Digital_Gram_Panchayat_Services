import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { getApplication, setCurrentApplication } from '../features/userSlice';
import { Box, Button, Divider, Typography } from '@mui/material';
import { ApplicationStatusTracker } from './ApplicationStatusTracker';
import { updateApplication } from '../features/staffSlice';

const ShowButtons =({userProfile})=>{
    const { currentApplication } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const handleStaffApproveApplication = () => {
        dispatch(setCurrentApplication({
            ...currentApplication,
            status: 'Documents Verification'
        }))
        dispatch(updateApplication({ applicationId: currentApplication._id, status: 'Documents Verification', reason: '' }))
    }
    const handleStaffRejectApplication = () => {
        dispatch(setCurrentApplication({
            ...currentApplication,
            status: 'StaffRejected',
            reason: 'failed'
        }))
        console.log('calling updateApplication -->' + JSON.stringify({ status: 'StaffRejected', reason: 'Failed' }))
        dispatch(updateApplication({ applicationId: currentApplication._id, status: 'StaffRejected', reason: 'Failed' }))
    }
    const handleAdminApproveApplication = () => {
        dispatch(setCurrentApplication({
            ...currentApplication,
            status: 'Approved'
        }))
        dispatch(updateApplication({ applicationId: currentApplication._id, status: 'Approved', reason: '' }))
    }
    const handleAdminRejectApplication = () => {
        dispatch(setCurrentApplication({
            ...currentApplication,
            status: 'AdminRejected',
            reason: 'Not Qualified'
        }))
        console.log('calling updateApplication -->' + JSON.stringify({ status: 'AdminRejected', reason: 'Not Qualified' }))
        dispatch(updateApplication({ applicationId: currentApplication._id, status: 'AdminRejected', reason: 'Not Qualified' }))
    }
   if((currentApplication?.status=="Documents Verification" && userProfile=='staff') || currentApplication?.status=="Approved"){
     return <Button variant="contained" sx={{ backgroundColor: 'green' }}>Approved</Button>
   }else if(currentApplication?.status=="StaffRejected" || currentApplication?.status =="AdminRejected"){
     return <Button variant="contained" sx={{ backgroundColor: 'red' }}>Rejected</Button>
   }else{
        if(userProfile=='admin'){
            return(
                <>
                  <Button variant="contained" onClick={handleAdminApproveApplication}>Approve</Button>
                  <Button variant="contained" onClick={handleAdminRejectApplication} sx={{ backgroundColor: 'red' }}>Reject</Button>
                </>
            )
        }else{
            return(
                <>
                  <Button variant="contained" onClick={handleStaffApproveApplication}>Approve</Button>
                  <Button variant="contained" onClick={handleStaffRejectApplication} sx={{ backgroundColor: 'red' }}>Reject</Button>
                </>
            )
        }
   }

}
export const ApplicationDetail = () => {
    const { id } = useParams();
    const { userDetails } = useSelector((state) => state.user)
    const { currentApplication } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    useEffect(() => {
        if (id) {
            console.log("*****get application called !")
            dispatch(getApplication(id));
        }
    }, [id])
    return (
        <Box sx={{ width: '100vw', display: 'flex', justifyContent: 'center' }}>
            <Box sx={{ width: '95%', padding: '15px 0px', height: '95%', border: '1px solid grey', backgroundColor: 'whitesmoke' }}>
                <Typography variant='h6' sx={{ fontWeight: 'bold' }}>Service : {currentApplication?.service}</Typography>
                <Divider sx={{ width: '100%' }} />
                <Box sx={{ width: '100%', margin: '15px 0px' }}>
                    <ApplicationStatusTracker status={currentApplication?.status} reason={currentApplication?.reason} />
                </Box>
                <Divider sx={{ width: '100%' }} />
                <Box sx={{ width: '100%' }}>
                    <Box id='applicationForm' sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '15px 0px', width: '95%', height: '70vh', overflowY: 'auto', backgroundColor: 'whitesmoke' }}>
                        <Box sx={{ width: '98%', padding: '10px 0px', backgroundColor: 'whitesmoke', display: 'flex', alignItems: 'center' }}>
                            <Typography sx={{ width: '20%', fontWeight: 'bold', fontSize: '1.2rem', color: 'black' }}>Full Name :</Typography>
                            <Typography>{currentApplication?.fullName}</Typography>
                        </Box>
                        <Divider sx={{ width: '98%' }} />
                        <Box sx={{ width: '98%', padding: '10px 0px', backgroundColor: 'whitesmoke', display: 'flex', alignItems: 'center' }}>
                            <Typography sx={{ width: '20%', fontWeight: 'bold', fontSize: '1.2rem', color: 'black' }}>Number :</Typography>
                            <Typography>{currentApplication?.number}</Typography>
                        </Box>
                        <Divider sx={{ width: '98%' }} />
                        <Box sx={{ width: '98%', padding: '10px 0px', backgroundColor: 'whitesmoke', display: 'flex', alignItems: 'center' }}>
                            <Typography sx={{ width: '20%', fontWeight: 'bold', fontSize: '1.2rem', color: 'black' }}>Email :</Typography>
                            <Typography>{currentApplication?.email}</Typography>
                        </Box>
                        <Divider sx={{ width: '98%' }} />
                        <Box sx={{ width: '98%', padding: '10px 0px', backgroundColor: 'whitesmoke', display: 'flex', alignItems: 'center' }}>
                            <Typography sx={{ width: '20%', fontWeight: 'bold', fontSize: '1.2rem', color: 'black' }}>Documents :</Typography>
                            <Box sx={{ width: '80%', display: 'flex', flexDirection: 'column' }}>
                                {currentApplication
                                    ? currentApplication?.documents.map((docObj, index) => {
                                        // Get the key-value pairs of the object
                                        const entries = Object.entries(docObj);
                                        console.log('documents entrie : ' + JSON.stringify(entries));
                                        console.log('documents docObj : ' + JSON.stringify(docObj));

                                        // Iterate over each key-value pair
                                        return entries.map(([key, value]) => (
                                            <Box key={`${index}-${key}`} sx={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                                                <Typography sx={{ width: '20%' }}>{key}:</Typography>
                                                <Box sx={{ width: '45%', height: '100px' }}>
                                                    <img src={value.imgUrl} alt={`${key} image`} style={{ width: '100%', height: '100px' }} />
                                                </Box>
                                            </Box>
                                        ));
                                    })

                                    : null}
                            </Box>
                        </Box>
                        <Divider sx={{ width: '100%' }} />
                        {
                            userDetails?.profile != 'user'
                                ?
                                (
                                    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
                                        <Box sx={{ width: '30%', display: 'flex', justifyContent: 'space-evenly' }}>
                                           <ShowButtons userProfile={userDetails?.profile}/>
                                        </Box>
                                    </Box>
                                )
                                :
                                null
                        }
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}
