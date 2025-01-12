import React from 'react'
import { Box, Button, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom';

export const PaymentFailed = () => {
    const navigate= useNavigate();
    return (
        <Box sx={{ height: '50vh', width: '100vw', backgroundColor: 'white', display:'flex', alignItems:'center', justifyContent:'center' }}>
            <Box sx={{ height: '90%', width: '90%', backgroundColor: 'whitesmoke', display:'flex',flexDirection:'column', alignItems:'center', justifyContent:'center' }}>
                   <Box sx={{height:'100%', width:{xs:'100%', sm:'80%', md:'50%', boxShadow:'2px 2px 10px black'}}}>
                         <Typography variant='h4' sx={{backgroundColor:'red', padding:'4px 7px', borderRadius:'5px'}}>Payment Failed</Typography>
                         <Button onClick={()=>navigate('/user')}>Back</Button>
                   </Box>
            </Box>
        </Box>
    )
}
