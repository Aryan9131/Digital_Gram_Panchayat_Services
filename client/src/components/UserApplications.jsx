import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import { getUserApplications } from '../features/userSlice';
import { Box, Divider, Typography } from '@mui/material';
export const UserApplications = () => {
    const { id } = useParams();
    const navigate=useNavigate();
    const { userApplications } = useSelector((state) => state.user)
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getUserApplications(id));
    }, [id])
    return (
        <Box sx={{ width: '100vw', height: '80vh', display:'flex', justifyContent:'center' }}>
            <Box sx={{ width: '95%', height: '95%', border: '1px solid grey',display:'flex',flexDirection:'column', alignItems:'center',margin:'10px 0px' }}>
                <Box sx={{ height: '40px', width: '95%', backgroundColor: 'whitesmoke', display: 'flex', alignItems: 'center' }}>
                    <Typography sx={{ fontSize: '16px', fontWeight: '800',width:{xs:'30%', sm:'10%'} }} >S.NO.</Typography>
                    <Typography sx={{ fontSize: '16px', fontWeight: '800', width:'55%' }} >Service</Typography>

                    <Typography sx={{ fontSize: '16px', fontWeight: '800', width:'15%' }}>Details</Typography>
                    <Typography sx={{display:{xs:'none', sm:'flex'}, fontSize: '16px', fontWeight: '800',width:'20%' }}>Status</Typography>
                </Box>
                <Divider sx={{ width: '95%', border:'1px solid grey' }} />
                {
                    userApplications?.map((application, index) => {
                        return (
                            <Box key={index} sx={{borderBottom:'1px solid grey', height: '40px', width: '95%', backgroundColor: 'whitesmoke', display: 'flex',  alignItems: 'center' }}>
                                <Typography sx={{width:{xs:'30%', sm:'10%'}, fontSize: '15px', fontWeight: '600', color: '#303131' }} >{index}.</Typography>
                                <Typography sx={{width:'55%', fontSize: '15px', fontWeight: '600', color: '#303131' }} >{application.service}</Typography>
                                <Typography
                                  onClick={()=>{navigate(`/user/application/${application._id}`)}}
                                  sx={{width:'15%', fontSize: '15px', fontWeight: '600', color: 'blue',
                                       textDecoration: 'underline', '&:hover': { cursor: 'pointer' } }}>
                                   view
                                </Typography>
                                <Typography sx={{width:'20%',display:{xs:'none', sm:'flex'}, fontSize: '15px', fontWeight: '600', color: 'white', padding: '5px 7px', backgroundColor: (application.status == 'StaffRejected' || application.status == 'AdminRejected') ? 'red' : 'green' }}>{application.status}</Typography>
                            </Box>
                        )
                    })
                }
            </Box>
        </Box>
    )
}
