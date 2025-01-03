import { Box } from '@mui/material'
import React, { useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { Navbar } from './Navbar'
import { StaffFooter } from './StaffFooter'
import { getAllServices } from '../features/userSlice'
import { useDispatch, useSelector } from 'react-redux';

export const Layout = () => {
  const navigate = useNavigate();
  const { userDetails } = useSelector((state) => state.user)
  const { services } = useSelector((state) => state.user);
  const location = useLocation();
  const fullPath = location.pathname;
  const lastSegment = fullPath.split('/').pop();
  console.log(" full path is --> " + fullPath);
  console.log('last segment is ---> ' + lastSegment);
  useEffect(() => {
    if (fullPath == '/' && lastSegment == '') {
      if (!userDetails || userDetails?.profile == 'user') {
        navigate('/user');
      } else if (userDetails?.profile == 'staff') {
        navigate('/staff');
      } else if(userDetails?.profile == 'admin'){
        navigate('/admin');
      }
    }
  }, [userDetails])
  const dispatch = useDispatch();
  React.useEffect(() => {
    console.log("userLayout called !")
    if (services.length == 0)
      dispatch(getAllServices());
  })
  return (
    <Box id="staffLayout" sx={{ width: '100vw', minHeightHeight: '100vh', display: 'flex', flexDirection: 'column', overflowX: 'hidden', backgroundColor: 'whitesmoke' }}>
      <Navbar />
      <Outlet />
      <StaffFooter />
    </Box>
  )
}
