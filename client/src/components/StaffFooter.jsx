import { Box, Divider, IconButton, List, ListItem, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


export const StaffFooter = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    return (
        <Box sx={{ backgroundColor: '#1b2138', width: '100vw', display: 'flex', flexDirection: 'column', alignItems: 'center', color: '#a2a7af', fontWeight: 'bold' }}>
            <Box sx={{ margin: "15px 0px", width: '80%', display: 'flex', justifyContent: 'space-between', fontSize:'14px' }}>
                <Box id="AboutUs">
                    <List>
                        <ListItem sx={{ fontSize: '1.1rem', color: 'whitesmoke' }}>
                            About Us
                        </ListItem>
                        <ListItem>
                            About the Portal
                        </ListItem>
                        <ListItem>
                            Vision, Mission, Values
                        </ListItem>
                        <ListItem>
                            Who We Are
                        </ListItem>
                        <ListItem>
                            Right to Information
                        </ListItem>
                    </List>
                </Box>
                <Box id="ContackUs">
                    <List>
                        <ListItem sx={{ fontSize: '1.1rem', color: 'whitesmoke' }}>
                            Contact Us
                        </ListItem>
                        <ListItem>
                            Helpdesk Numbers
                        </ListItem>
                        <ListItem>
                            Grievances
                        </ListItem>
                        <ListItem>
                            Help
                        </ListItem>
                        <ListItem>
                            admin
                        </ListItem>
                    </List>
                </Box>
                <Box id="PortalUse">
                    <List>
                        <ListItem sx={{ fontSize: '1.1rem', color: 'whitesmoke' }}>
                            Using the Portal
                        </ListItem>
                        <ListItem>
                            Website Policies
                        </ListItem>
                        <ListItem>
                            Accessibility Statement
                        </ListItem>
                        <ListItem>
                            Site Map
                        </ListItem>
                        <ListItem>
                            Browser Support
                        </ListItem>
                    </List>
                </Box>
                <Box id="RelatedSites">
                    <List>
                        <ListItem sx={{ fontSize: '1.1rem', color: 'whitesmoke' }}>
                            Related Sites
                        </ListItem>
                        <ListItem>
                            Income Tax India
                        </ListItem>
                        <ListItem>
                            Protean (previously NSDL)
                        </ListItem>
                        <ListItem>
                            TRACES
                        </ListItem>
                    </List>
                </Box>
            </Box>
            <Box sx={{ width: '80%', color: 'whitesmoke' }}>
                <Typography sx={{ fontSize: '1.1rem', color: 'whitesmoke' }}>Follow us on : </Typography>
            </Box>
            <Divider sx={{ width: '80%', borderColor: 'white', margin: '25px 0px' }} />
            <Box sx={{ width: '80%', color: 'whitesmoke', display: 'flex',justifyContent:'space-between' }}>
                <Box id='footerLogo' sx={{display:'flex', flexDirection:'column', alignItems:'center'}}>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={() => { navigate('/staff') }}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 200 200"
                            width="40"
                            height="40"
                            id="appLogo"
                        >
                            <circle cx="100" cy="60" r="40" fill="#76c893" />
                            <rect x="90" y="60" width="20" height="60" fill="#4a4a4a" />

                            <rect x="120" y="120" width="60" height="40" rx="8" fill="#0077ff" />
                            <rect x="130" y="130" width="40" height="20" rx="4" fill="#ffffff" />

                            <path d="M20,160 Q60,120 100,160 Q140,120 180,160 Z" fill="#f4a261" />

                            <text
                                x="100"
                                y="180"
                                textAnchor="middle"
                                fill="#333333"
                                fontFamily="Arial, sans-serif"
                                fontSize="14"
                            >
                                Digital Gram Panchayat
                            </text>
                        </svg>
                    </IconButton>
                    <Typography sx={{fontSize:'12px'}}>Government. Of India</Typography>
                </Box>
                <Box id='footerText' sx={{color: '#a2a7af', paddingBottom:'40px', display:'flex',alignItems:'flex-end',alignContent:'flex-end', flexDirection: 'column'}}>
                    <Typography sx={{fontSize:'12px'}}>Last reviewed and updated on : 29-Dec-2024</Typography>
                    <Typography sx={{fontSize:'12px',margin:'7px 0px'}}>This site is best viewed in 1024 * 768 resolution with latest version of Chrome, Firefox, Safari and Microsoft Edge.</Typography>
                    <Typography sx={{fontSize:'12px'}}>Copyright @ Gram Panchayat , Government of India. All Rights Reserved.</Typography>
                </Box>
            </Box>
        </Box>
    );
};
