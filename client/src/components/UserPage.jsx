import { Box, Divider, IconButton, List, ListItem, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import OutboxIcon from '@mui/icons-material/Outbox';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getAllServicesByDepartment } from '../features/staffSlice';
import LaunchIcon from '@mui/icons-material/Launch';
import CardMembershipIcon from '@mui/icons-material/CardMembership';
import DescriptionIcon from '@mui/icons-material/Description';
import WaterIcon from '@mui/icons-material/Water';
import ArticleIcon from '@mui/icons-material/Article';

export const UserPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    return (
        <Box id="userPage" sx={{ width: '100vw', minHeight: '80vh', overflow: 'hidden', display: 'flex', justifyContent: 'center' }}>
            <Box sx={{ width: '90%', height: '100%', display: 'flex' }}>
                <Box sx={{ width: '30%', height: '100%', backgroundColor: 'grey', display: 'flex', justifyContent: 'center' }}>
                    <Box sx={{ width: '90%', height: '99%', display: 'flex', flexDirection: 'column' }}>
                        <Box>
                            <Typography
                                variant="h5"
                                sx={{
                                    fontWeight: '700',
                                    padding: '10px 0px',
                                    position: 'relative', // For positioning the underline
                                    display: 'inline-block',
                                    '&::after': {
                                        content: '""',
                                        position: 'absolute',
                                        left: 1,
                                        right: 0,
                                        bottom: '8px', // Adjust distance between text and underline
                                        height: '4px', // Adjust underline thickness
                                        width: '65px',
                                        backgroundColor: 'blue', // Underline color
                                    },
                                }}
                            >
                                Quick
                            </Typography>
                            <Typography variant="span" sx={{marginLeft:'5px', fontSize:'22px', fontWeight: '700',padding: '10px 0px',}}>
                                Links :
                            </Typography>
                        </Box>
                        <Box sx={{width: '100%', flexGrow: 1, backgroundColor: 'whitesmoke', fontSize:'14px', fontWeight:'600' }}>
                            <List>
                                <ListItem sx={{display:'flex', borderBottom:'1px solid grey'}}>
                                    <CardMembershipIcon sx={{width:'30px',height:'30px',marginRight:'10px'}}/> Birth Certificate (initial registration)
                                </ListItem> 
                                <ListItem sx={{display:'flex', borderBottom:'1px solid grey'}}>
                                    <DescriptionIcon sx={{width:'30px',height:'30px',marginRight:'10px'}}/> Domicile Certificate
                                </ListItem>
                                <ListItem  sx={{display:'flex', borderBottom:'1px solid grey'}}>
                                   <ArticleIcon sx={{width:'30px',height:'30px',marginRight:'10px'}}/> Death Certificate
                                </ListItem>
                                <ListItem  sx={{display:'flex', borderBottom:'1px solid grey'}}>
                                    <DescriptionIcon sx={{width:'30px',height:'30px',marginRight:'10px'}}/>  Property Tax
                                </ListItem>
                                <ListItem  sx={{display:'flex', borderBottom:'1px solid grey'}}>
                                   <WaterIcon sx={{width:'30px',height:'30px',marginRight:'10px'}}/> Water Tax
                                </ListItem>
                                <ListItem  sx={{display:'flex', borderBottom:'1px solid grey'}}>
                                   <DescriptionIcon sx={{width:'30px',height:'30px',marginRight:'10px'}}/>Know Panchayat Details
                                </ListItem>
                                <ListItem  sx={{display:'flex', borderBottom:'1px solid grey'}}>
                                   <ArticleIcon sx={{width:'30px',height:'30px',marginRight:'10px'}}/>  Meeting Schedules
                                </ListItem>
                            </List>
                        </Box>
                    </Box>
                </Box>
                <Box sx={{ width: '70%', height: '100%', backgroundColor: 'yellow' }}>

                </Box>
            </Box>
        </Box>
    );
};
