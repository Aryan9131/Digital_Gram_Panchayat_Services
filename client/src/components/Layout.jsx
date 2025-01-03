import { Box } from '@mui/material'
import React from 'react'
import { Outlet } from 'react-router-dom'
import {Navbar} from './Navbar'
import { StaffFooter } from './StaffFooter'
import {getAllServices} from '../features/userSlice'
import { useDispatch, useSelector } from 'react-redux';

export const Layout = () => {
  const { services } = useSelector((state) => state.user);
  const dispatch = useDispatch();
    React.useEffect(()=>{
      console.log("userLayout called !")
          if(services.length==0)
             dispatch(getAllServices());
      })
  return (
     <Box id="staffLayout" sx={{width:'100vw',minHeightHeight:'100vh', display:'flex', flexDirection:'column', overflowX:'hidden', backgroundColor:'whitesmoke'}}>
         <Navbar/>
         <Outlet />
         <StaffFooter/>
     </Box>
  )
}
