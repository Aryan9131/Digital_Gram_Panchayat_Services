import { Box } from '@mui/material'
import React from 'react'
import { Outlet } from 'react-router-dom'
import {StaffNavbar} from './StaffNavbar'
import { StaffFooter } from './StaffFooter'

export const StaffLayout = () => {
  return (
     <Box id="staffLayout" sx={{width:'100vw',height:'100vh', display:'flex', flexDirection:'column', overflowX:'hidden', backgroundColor:'whitesmoke'}}>
         <StaffNavbar/>
         <Outlet />
         <StaffFooter/>
     </Box>
  )
}
