import * as React from 'react';
import Box from '@mui/material/Box';
import { Typography, Divider, IconButton, Button } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { MoreMenu } from './ServiceMoreMenu';
import LaunchIcon from '@mui/icons-material/Launch';
import { fetchOneService } from '../features/staffSlice';

export function ServiceDetails() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { id } = useParams();
    const { userDetails } = useSelector((state) => state.user);
    const { currentService } = useSelector((state)=> state.staff)
    const handleClickToCreateApplication =()=>{
        if(userDetails){
            navigate(`/user/create-application/${currentService._id}`)
        }else{
            navigate(`/sign-in`)
        }
    }
    React.useEffect(()=>{
        if(id){
            dispatch(fetchOneService({serviceId:id}))
        }
    },[id])
    React.useEffect(()=>{
       console.log('current service changed --> '+ currentService)
    },[currentService])
    return (
        <Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Box id='serviceDetailHeader' sx={{ padding: '3px 0px', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', width: '96%' }}>
                <Box id="service" sx={{ width: { xs: '100%', md: '80%' }, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant='h5' sx={{ fontWeight: 'bold' }}>Service : {currentService?.service}</Typography>
                    {userDetails?.profile === 'admin' && <MoreMenu id={id} />}
                </Box>
                <Box id="serviceType" sx={{ display: 'flex', flexDirection: { xs: 'row', md: 'column' }, justifyContent: 'space-between', width: { xs: '60%', md: 'auto' }, padding: '10px', boxShadow: { xs: 'none', md: '-2px 2px 20px grey' }, borderRadius: '5px' }}>
                    <Typography sx={{ fontWeight: 'bold', color: 'text.secondary' }}>Type : {currentService?.type}</Typography>
                    <Divider sx={{ width: '100%', display: { xs: 'none', md: 'flex' } }} />
                    <Typography sx={{ fontWeight: 'bold', color: 'text.secondary' }}>Fees : {currentService?.fees}</Typography>
                </Box>
            </Box>
            <Divider sx={{ width: '100%' }} />
            <Box id='serviceDetailBody' sx={{ width: '96%', overflowY: 'auto', height: { xs: '75vh', md: '70vh' } }}>
                <Box sx={{ width: { xs: '100%', md: '80%' }, padding: '15px 0px' }}>
                    <Typography sx={{ fontWeight: 'bold', color: 'text.secondary' }}><Typography variant='span' sx={{ color: 'black' }}>Admin:</Typography> {currentService?.admin}</Typography>
                    <Divider sx={{ width: '100%', margin: '7px 0px' }} />
                    <Typography sx={{ fontWeight: 'bold', color: 'text.secondary', textTransform: "capitalize" }}><Typography variant='span' sx={{ color: 'black' }}>Department :</Typography> {currentService?.department}</Typography>
                    <Divider sx={{ width: '100%', margin: '7px 0px' }} />
                    <Typography sx={{ fontWeight: 'bold', color: 'text.secondary' }}><Typography variant='span' sx={{ color: 'black' }}>Details :</Typography> {currentService?.details}</Typography>
                    <Divider sx={{ width: '100%', margin: '7px 0px' }} />
                    <Typography sx={{ fontWeight: 'bold', color: 'text.secondary' }}>
                        <Typography variant='span' sx={{ color: 'black' }}>
                            Documents Required :
                        </Typography>
                        {currentService?.documents_required.map((word, index) => (
                            <Typography variant='span' key={index}>
                                {word},&nbsp;
                            </Typography>
                        ))}
                    </Typography>
                </Box>
            </Box>
            <Divider sx={{ width: '100%', margin: '5px 0px', }} />

            <Box id='serviceDetailFooter' sx={{ width: '96%',marginBottom:'5px' }}>
                <Box sx={{ width: { xs: '95%', md: '80%' }, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                    {
                        !userDetails ||  userDetails?.profile=='user'
                        ?
                        <Button variant='contained' size='small' 
                          onClick={handleClickToCreateApplication}
                          sx={{
                              textTransform:'capitalize',display:'flex',alignItems:'center',
                              fontWeight: 'bold' 
                            }}>
                           Apply : <LaunchIcon sx={{height:15, width:15}}/>
                        </Button>
                       :
                      <Box id="applicants">
                        <Typography sx={{ fontWeight: 'bold' }}>Applicants : <Typography variant='span' sx={{ color: 'blue', textDecoration: 'underline' }}>{currentService?.applicants}</Typography><IconButton sx={{ color: 'blue' }}><LaunchIcon sx={{ height: 20, width: 20 }} /></IconButton></Typography>
                      </Box>
                    }
                    <Box id="lastDate" sx={{ backgroundColor: 'white', borderRadius: '5px' }}>
                        <Typography sx={{ fontWeight: 'bold', }}>Last Date : {currentService?.last_date}</Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}
