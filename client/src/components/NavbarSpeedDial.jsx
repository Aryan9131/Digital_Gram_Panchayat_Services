import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

export function NavbarSpeedDial() {
  return (
    <Box
      id="speedDial"
      sx={{
        position: 'relative',
        display: 'inline-block',
      }}
    >
      <Typography
        id="speedDialText"
        sx={{
          padding: '10px',
          cursor: 'pointer',
          textAlign: 'center', // Center align text
          '&:hover':{backgroundColor: 'lightblue'},
          width: '100%', // Match parent width
        }}
      >
        Applications
      </Typography>
      <Divider id="speedDialTextDivider" sx={{display:'none'}}/>
      <Box
        id="ations"
        sx={{
          padding: '10px',
          position: 'absolute',
          width: '100%',
          top: '100%',
          backgroundColor: 'skyblue',
          opacity: 0, // Initial state hidden
          visibility: 'hidden',
          zIndex: 10,
          transition: 'opacity 0.5s ease-in-out, visibility 0.5s ease-in-out',
        }}
      >
        <Typography sx={{ fontSize: '15px', color: 'white', '&:hover':{backgroundColor:'lightblue', cursor:'pointer'} }}> &gt; Previous</Typography>
        <Divider sx={{ margin: '5px 0px' }} />
        <Typography sx={{ fontSize: '15px', color: 'white','&:hover':{backgroundColor:'lightblue', cursor:'pointer'} }}> &gt; Deleted</Typography>
      </Box>
      {/* Show `ations` on hover */}
      <style>
        {`
          #speedDial:hover #ations {
            opacity: 1; /* Make visible */
            visibility: visible; /* Ensure it becomes visible */
          }
          #speedDial:hover #speedDialText {
            background-color: skyblue;
          }
            #speedDial:hover #speedDialTextDivider {
             display:flex
          }
        `}
      </style>
    </Box>
  );
}
