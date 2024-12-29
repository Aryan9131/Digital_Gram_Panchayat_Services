import { Box } from '@mui/material'
import React from 'react'
import { Outlet } from 'react-router-dom'
import AdminNavbar from './AdminNavbar'
export const AdminLayout = () => {
  return (
     <Box sx={{width:'100vw', height:'100vh',overflow:'hidden', backgroundColor:'whitesmoke'}}>
         <AdminNavbar/>
         <Outlet/>
     </Box>
  )
}
