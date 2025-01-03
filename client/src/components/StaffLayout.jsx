import { Box } from '@mui/material'
import React from 'react'
import { Outlet } from 'react-router-dom'
import { StaffFooter } from './StaffFooter'
import { Navbar } from './Navbar'

export const StaffLayout = () => {
  return (
     <Box id="staffLayout" sx={{width:'100vw',height:'100vh', display:'flex', flexDirection:'column', overflowX:'hidden', backgroundColor:'whitesmoke'}}>
         <Navbar/>
         <Outlet />
         <StaffFooter/>
     </Box>
  )
}
