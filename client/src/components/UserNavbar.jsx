import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import HistoryToggleOffIcon from '@mui/icons-material/HistoryToggleOff';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import AddIcon from '@mui/icons-material/Add';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import { Button, Divider } from '@mui/material';
import CallIcon from '@mui/icons-material/Call';
import LanguageIcon from '@mui/icons-material/Language';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '30ch',
        },
    },
}));

export function UserNavbar() {
    const navigate = useNavigate();
    const location = useLocation();
    const { userDetails } = useSelector((state) => state.user)
    // Get the full pathname (e.g., /admin/create-service)
    const fullPath = location.pathname;
    // Extract only the last part (e.g., create-service)
    const lastSegment = fullPath.split('/').pop();
    console.log('fullpath --> ' + fullPath + " lastpart --> " + lastSegment);

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}>My account</MenuItem>
        </Menu>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem>
                <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                    <Badge badgeContent={4} color="error">
                        <HistoryToggleOffIcon />
                    </Badge>
                </IconButton>
                <p>Previous</p>
            </MenuItem>
            <MenuItem>
                <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                    <Badge badgeContent={4} color="error">
                        <LocalLibraryIcon />
                    </Badge>
                </IconButton>
                <p>All Applications</p>
            </MenuItem>
            <MenuItem>
                <IconButton
                    size="large"
                    aria-label="show 17 new notifications"
                    color="inherit"
                >
                    <Badge badgeContent={17} color="error">
                        <NotificationsIcon />
                    </Badge>
                </IconButton>
                <p>Notifications</p>
            </MenuItem>
            <MenuItem onClick={handleProfileMenuOpen}>
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <AccountCircle />
                </IconButton>
                <p>Profile</p>
            </MenuItem>
        </Menu>
    );
    const [showSpeedDial, setShowSpeedDial] = React.useState(false);
    const [profile, setProfile] = React.useState('admin')
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{ backgroundColor: 'whitesmoke' }}>
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        sx={{ mr: 2 }}
                        onClick={() => { navigate('/admin') }}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 200 200"
                            width="50"
                            height="50"
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

                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ color: 'black',fontWeight:'600', display: { xs: 'none', sm: 'block' } }}
                    >
                        Digital_Gram_Panchayat_Services
                    </Typography>
                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ color: 'grey', fontWeight: '600', width: { md: '40%' }, display: { xs: 'none', md: 'flex' }, justifyContent: 'space-evenly', alignItems: 'center' }}>
                        <Box id="speedDial" onClick={() => setShowSpeedDial((state) => !state)} sx={{ border: showSpeedDial ? '1px solid blue' : 'none', position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <Typography id='speedDialText' variant='span'
                                sx={{
                                    padding: '10px 0px', display: 'flex', alignItems: 'center', cursor: 'pointer', fontSize: '13px'
                                }}>
                                <CallIcon sx={{ height: '17px', marginRight: '3px' }} />
                                Call Us
                                <KeyboardArrowDownIcon sx={{ display: showSpeedDial ? 'none' : 'flex', height: '15px', marginLeft: '1px' }} />
                                <KeyboardArrowUpIcon sx={{ display: showSpeedDial ? 'flex' : 'none', height: '15px', marginLeft: '1px' }} />
                            </Typography>
                            <Box id='ations'
                                sx={{
                                    visibility: showSpeedDial ? 'visible' : 'hidden', marginTop: '7px', borderRadius: '7px',
                                    border: '1px solid grey', backgroundColor: 'whitesmoke', boxShadow: '1px 1px 25px grey',
                                    position: 'absolute', top: '100%', width: '35vw', height: '30vh', padding: '10px'
                                }}>
                                <ArrowDropUpIcon sx={{ width: '40px', height: '40px', position: 'absolute', top: '-23px', color: 'whitesmoke', right: '50%' }} />
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem, praesentium amet quas neque blanditiis sunt repudiandae? Impedit temporibus et aspernatur.
                            </Box>
                        </Box>

                        <Divider orientation="vertical" flexItem sx={{ borderWidth: '1px' }} />
                        <Typography variant='span' sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer', fontSize: '13px' }}>
                            <LanguageIcon sx={{ height: '17px', marginRight: '3px' }} /> English
                        </Typography>
                        <Divider orientation="vertical" flexItem sx={{ borderWidth: '1px' }} />
                        {
                            userDetails
                                ?
                                <>
                                    <IconButton
                                        size="large"
                                        aria-label="show 17 new notifications"
                                        color="inherit"
                                    >
                                        <Badge badgeContent={17} color="error">
                                            <NotificationsIcon />
                                        </Badge>
                                    </IconButton>
                                    <IconButton
                                        size="large"
                                        edge="end"
                                        aria-label="account of current user"
                                        aria-controls={menuId}
                                        aria-haspopup="true"
                                        onClick={handleProfileMenuOpen}
                                        color="inherit"
                                    >
                                        <AccountCircle />
                                    </IconButton>
                                </>
                                :
                                <>
                                    <Box>
                                        <Button variant="outlined" size="small"
                                            onClick={() => navigate('/sign-in')}
                                            sx={{ textTransform: "capitalize", color: '#29388c', borderColor: '#29388c', fontSize: '12px', fontWeight: '600', marginRight: '8px' }}>
                                            Login
                                        </Button>
                                        <Button variant='contained' size='small'
                                            onClick={() => navigate('/sign-up')}
                                            sx={{ textTransform: "capitalize", fontSize: '12px', fontWeight: '600', backgroundColor: '#29388c' }}>
                                            Register
                                        </Button>
                                    </Box>
                                </>
                        }
                    </Box>
                    <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            color="inherit"
                        >
                            <MoreIcon />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            <Box sx={{ backgroundColor: '#29388c', display: 'flex', alignItems: 'center', width: '100%', fontSize:'15px', fontWeight:'600', color:'whitesmoke' }}>
                <Box sx={{ width:'60%',display: 'flex', justifyContent: 'space-evenly', alignItems: 'center'}}>
                    <Box sx={{ display: 'flex', alignItems: 'center', padding: '10px 20px' }}>
                        <Typography variant='span'>Home</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', padding: '10px 20px' }}>
                        <Typography variant='span'>Services</Typography>
                        <KeyboardArrowDownIcon/>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', padding: '10px 20px' }}>
                        <Typography variant='span'>Company</Typography>
                        <KeyboardArrowDownIcon/>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', padding: '10px 20px' }}>
                        <Typography variant='span'>Help</Typography>
                        <KeyboardArrowDownIcon/>
                    </Box>
                </Box>
                <Box sx={{width:'40%',display: 'flex', justifyContent:'center'}}>
                     <Box sx={{backgroundColor:'#066acf', padding:'5px 10px', borderRadius:'5px'}}>
                        <SearchIcon/>
                     </Box>
                </Box>
            </Box>
            {renderMobileMenu}
            {renderMenu}
        </Box>
    );
}
