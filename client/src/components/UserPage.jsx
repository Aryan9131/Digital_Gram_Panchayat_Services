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
import { MyCarousel } from './MyCrausel';
export const UserPage = () => {
    const navigate = useNavigate();
    const { services, searchQuery } = useSelector((state) => state.user);
     // Filter services based on search query
    const filteredServices = services.filter((service) =>
       service.service.toLowerCase().includes(searchQuery.toLowerCase())
     );
    return (
        <Box id="userPage" sx={{ width: '100vw', minHeight: '80vh', display: 'flex', justifyContent: 'center' }}>
            <Box sx={{ width: {xs:'100%', md:'90%'}, height: '100%', display: 'flex', flexDirection:{xs:'column', md:'row'} }}>
                <Box sx={{ width: {xs:'100%', md:'30%'}, height: {xs:'auto', md:'100%'}, backgroundColor: '#efeef6', display: 'flex',flexDirection:{xs:'column', md:'row'},alignItems:'center', justifyContent: 'center' }}>
                        <Box id="carousel" sx={{ margin: '15px 0px', height: '300px', width: '100%', display: {xs:'flex', md:'none'}, justifyContent: 'center' }}>
                            <MyCarousel />
                        </Box>
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
                            <Typography variant="span" sx={{ marginLeft: '5px', fontSize: '22px', fontWeight: '700', padding: '10px 0px', }}>
                                Links :
                            </Typography>
                        </Box>
                        <Box sx={{ color: '#313030', width: '100%', flexGrow: 1, backgroundColor: 'white', fontSize: {xs:'16px', md:'14px'}, fontWeight: '600' }}>
                            <List>
                                <ListItem sx={{ display: 'flex', borderBottom: '1px solid grey', '&:hover': { color: 'black', cursor: 'pointer' } }}>
                                    <CardMembershipIcon sx={{ color: '#4C4CF7', width: '30px', height: '30px', marginRight: '10px' }} /> Birth Certificate (initial registration)
                                </ListItem>
                                <ListItem sx={{ display: 'flex', borderBottom: '1px solid grey', '&:hover': { color: 'black', cursor: 'pointer' } }}>
                                    <DescriptionIcon sx={{ color: '#4C4CF7', width: '30px', height: '30px', marginRight: '10px' }} /> Domicile Certificate
                                </ListItem>
                                <ListItem sx={{ display: 'flex', borderBottom: '1px solid grey', '&:hover': { color: 'black', cursor: 'pointer' } }}>
                                    <ArticleIcon sx={{ color: '#4C4CF7', width: '30px', height: '30px', marginRight: '10px' }} /> Death Certificate
                                </ListItem>
                                <ListItem sx={{ display: 'flex', borderBottom: '1px solid grey', '&:hover': { color: 'black', cursor: 'pointer' } }}>
                                    <DescriptionIcon sx={{ color: '#4C4CF7', width: '30px', height: '30px', marginRight: '10px' }} /> RashanCard
                                </ListItem>
                                <ListItem sx={{ display: 'flex', borderBottom: '1px solid grey', '&:hover': { color: 'black', cursor: 'pointer' } }}>
                                    <WaterIcon sx={{ color: '#4C4CF7', width: '30px', height: '30px', marginRight: '10px' }} /> Water Tax
                                </ListItem>
                                <ListItem sx={{ display: 'flex', borderBottom: '1px solid grey', '&:hover': { color: 'black', cursor: 'pointer' } }}>
                                    <DescriptionIcon sx={{ color: '#4C4CF7', width: '30px', height: '30px', marginRight: '10px' }} />Know Panchayat Details
                                </ListItem>
                                <ListItem sx={{ display: 'flex', borderBottom: '1px solid grey', '&:hover': { color: 'black', cursor: 'pointer' } }}>
                                    <ArticleIcon sx={{ color: '#4C4CF7', width: '30px', height: '30px', marginRight: '10px' }} />  Meeting Schedules
                                </ListItem>
                            </List>
                        </Box>
                    </Box>
                </Box>
                <Box sx={{ width: {xs:'100%', md:'70%'}, height: {xs:'auto', md:'100%'},backgroundColor:'whitesmoke', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Box sx={{ width: '90%',height: {xs:'auto', md:'100%'}, overflowY: 'auto', flexWrap: 1 }}>
                        <Box id="carousel" sx={{ margin: '15px 0px', height: '300px', width: '100%', display: {xs:'none', md:'flex'}, justifyContent: 'center' }}>
                            <MyCarousel />
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'column',width:'100%' }}>
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
                                            width: '70px',
                                            backgroundColor: 'blue', // Underline color
                                        },
                                    }}
                                >
                                    Latest
                                </Typography>
                                <Typography variant="span" sx={{ marginLeft: '6px', fontSize: '22px', fontWeight: '700', padding: '10px 0px', }}>
                                    Updates :
                                </Typography>
                            </Box>
                            <Box sx={{display: 'flex',marginBottom:'10px', flexDirection: 'column', border:'1px solid grey', color: '#313030', width: '98%', flexGrow: 1, backgroundColor: 'white', fontSize: '14px', fontWeight: '600' }}>
                                <Box sx={{borderBottom:'1px solid grey', color:'#2D2D2D', backgroundColor: 'whitesmoke', margin: '5px 0px', padding: '5px', display: 'flex' }}>
                                    <Typography sx={{fontSize:'1.1rem', fontWeight:'800',width: '70%' }}>Service</Typography>
                                    <Typography sx={{fontSize:'1.1rem', fontWeight:'800',width: '10%' }}>Detail</Typography>
                                    <Typography sx={{display:{xs:'none', sm:'flex'}, fontSize:'1.1rem', fontWeight:'800', width: '20%' }}>Last date</Typography>
                                </Box>

                                {
                                    filteredServices.map((service, index) => {
                                        return (
                                            <Box key={index} sx={{width:'100%', borderBottom:'1px solid grey', padding: '5px', display: 'flex',fontSize: {xs:'16px', md:'1.1rem'} }}>
                                                <Typography sx={{ width:'70%',color:'#434343',fontWeight:'600',fontSize: {xs:'16px', md:'1.1rem'} }}>{service.service}</Typography>
                                                <Typography
                                                        onClick={()=>{navigate(`/user/service-details/${service._id}`)}}
                                                        sx={{ 
                                                             width: '10%',textDecoration:'underline',color:'blue',
                                                             '&:hover':{cursor:'pointer'} 
                                                         }}>
                                                    view
                                                </Typography>
                                                <Typography sx={{display:{xs:'none', sm:'flex'}, width: '20%',fontWeight:'600' }}>{service.last_date}</Typography>
                                            </Box>
                                        )
                                    })
                                }
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};
