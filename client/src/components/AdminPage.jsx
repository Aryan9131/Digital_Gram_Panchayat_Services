import { Box, Divider, IconButton, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import OutboxIcon from '@mui/icons-material/Outbox';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getAllServices } from '../features/adminSlice';

export const AdminPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Access Redux states
  const { userDetails } = useSelector((state) => state.user);
  const { services, loading } = useSelector((state) => state.admin);

  // Fetch admin services when userDetails is available
  useEffect(() => {
    if (userDetails?._id) {
      dispatch(getAllServices(userDetails._id));
    }
  }, [userDetails, dispatch]);

  // Render loading or fallback message if services are not yet fetched
  if (loading) {
    return <Typography>Loading services...</Typography>;
  }

  return (
    <Box sx={{ width: '100vw', height: '100%', backgroundColor: 'white' }}>
      <Typography variant="h6" sx={{ borderBottom: '1px solid black', padding: '12px 5px' }}>
        Your Services ({userDetails?.name}):
      </Typography>
      <Box sx={{ display: 'flex', borderBottom: '1px solid black', width: '100vw', padding: '3px 5px' }}>
        <Box className="serialNo" sx={{ width: '5%' }}>
          <Typography sx={{ fontWeight: 'bold' }}>S.No</Typography>
        </Box>
        <Box className="service" sx={{ width: { xs: '90%', md: '50%' } }}>
          <Typography sx={{ fontWeight: 'bold' }}>Service</Typography>
        </Box>
        <Box className="applied date" sx={{ width: '15%', display: { xs: 'none', md: 'flex' } }}>
          <Typography sx={{ fontWeight: 'bold' }}>Applicants</Typography>
        </Box>
        <Box className="applied date" sx={{ width: '15%', display: { xs: 'none', md: 'flex' } }}>
          <Typography sx={{ fontWeight: 'bold' }}>Detail</Typography>
        </Box>
        <Box className="expired date" sx={{ width: '15%', display: { xs: 'none', md: 'flex' } }}>
          <Typography sx={{ fontWeight: 'bold' }}>Last Date</Typography>
        </Box>
      </Box>
      {services.length > 0 ? (
        services.map((service, index) => (
          <Box key={index} sx={{ display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ marginBottom: '3px', display: 'flex', alignItems: 'center', width: '100vw', padding: '0px 5px' }}>
              <Box className="service" sx={{ width: '5%' }}>
                <Typography>{index + 1}</Typography>
              </Box>
              <Box className="service" sx={{ width: { xs: '90%', md: '50%' } }}>
                {service.service}
              </Box>
              <Box
                className="applied date"
                sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', width: '15%' }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '35%' }}>
                  <Typography sx={{ fontWeight: '600', color: 'grey' }}>{service.applicants}</Typography>
                  <IconButton sx={{ color: 'blue', cursor: 'pointer' }}>
                    <OutboxIcon />
                  </IconButton>
                </Box>
              </Box>
              <Box className="applied date" sx={{ width: '15%', display: { xs: 'none', md: 'flex' } }}>
                <Typography
                  sx={{ color: 'blue', cursor: 'pointer', textDecoration: 'underline' }}
                  onClick={() => navigate(`/admin/service-details/${service._id}`)}
                >
                  view
                </Typography>
              </Box>
              <Box className="expired date" sx={{ width: '15%', display: { xs: 'none', md: 'flex' } }}>
                {service.last_date}
              </Box>
            </Box>
            <Divider sx={{ width: '100%' }} />
          </Box>
        ))
      ) : (
        <Typography sx={{ padding: '12px 5px' }}>No services found.</Typography>
      )}
    </Box>
  );
};
