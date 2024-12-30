import { Box } from '@mui/material'
import React from 'react'
import { Outlet } from 'react-router-dom'
import {UserNavbar} from './UserNavbar'
import { StaffFooter } from './StaffFooter'

export const UserLayout = () => {
  return (
     <Box id="staffLayout" sx={{width:'100vw',height:'100vh', display:'flex', flexDirection:'column', overflowX:'hidden', backgroundColor:'whitesmoke'}}>
         <UserNavbar/>
         <Outlet />
         <StaffFooter/>
     </Box>
  )
}
