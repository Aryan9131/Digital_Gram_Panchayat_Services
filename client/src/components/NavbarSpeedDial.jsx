import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Navigate, useNavigate } from 'react-router-dom';

export function NavbarSpeedDial({title, options}) {
  const navigate=useNavigate();
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
          padding:'0px 8px',
          display:'flex',alignItems:'center',
          cursor: 'pointer',
          textAlign: 'center', // Center align text
          '&:hover':{backgroundColor: '#29388c'},
          width: '100%', // Match parent width
          fontSize:'15px', fontWeight:'600'
        }}
      >
        {title} <KeyboardArrowDownIcon/>
      </Typography>
      <Divider id="speedDialTextDivider" sx={{display:'none'}}/>
      <Box
        id="ations"
        sx={{
          padding: '10px 8px',
          position: 'absolute',
          width: '100%',
          top: '100%',
          backgroundColor: '#29388c',
          opacity: 0, // Initial state hidden
          visibility: 'hidden',
          zIndex: 10,
          transition: 'opacity 0.5s ease-in-out, visibility 0.5s ease-in-out',
        }}
      >
        {
          options.map((obj, index)=>{
            return(
              <Box key={index}>
               <Typography 
                    onClick={()=>navigate(obj.url)}
                    sx={{
                      fontSize: '15px', color: 'white', 
                      '&:hover':{backgroundColor:'lightblue', cursor:'pointer'}
                      }}>
                    &gt; {obj.title}
                </Typography>
                <Divider sx={{ margin: '3px 0px' }} />
              </Box>
            )
          })
        }
  
      </Box>
      {/* Show `ations` on hover */}
      <style>
        {`
          #speedDial:hover #ations {
            opacity: 1; /* Make visible */
            visibility: visible; /* Ensure it becomes visible */
          }
          #speedDial:hover #speedDialText {
            background-color: #29388c;
          }
            #speedDial:hover #speedDialTextDivider {
             display:flex
          }
        `}
      </style>
    </Box>
  );
}
