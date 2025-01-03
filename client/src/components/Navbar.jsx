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
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import { Button, Divider } from '@mui/material';
import CallIcon from '@mui/icons-material/Call';
import LanguageIcon from '@mui/icons-material/Language';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { NavbarSpeedDial } from './NavbarSpeedDial';
import { logoutUser } from '../features/authSlice';
import HomeIcon from '@mui/icons-material/Home';
import HelpIcon from '@mui/icons-material/Help';
import { MobileAccordion } from './Accordion';
import PrimarySearchAppBar from './temproryNavbar';
import { setSearchQuery } from '../features/userSlice';
import LoginIcon from '@mui/icons-material/Login';

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

export function Navbar({ title, options }) {
    const navigate = useNavigate();
    const location = useLocation();
    const [searchValue, setSearchValue] = React.useState("");
    const { userDetails } = useSelector((state) => state.user)
    const fullPath = location.pathname;
    const lastSegment = fullPath.split('/').pop();
    const dispatch = useDispatch();
    const staffNavbarServiceOptions = [
        {
            title: 'Previous',
            url: '/services/previous-services'
        },
        {
            title: 'Deleted',
            url: '/services/deleted-services'
        }
    ]
    const userNavbarServiceOptions = [
        {
            title: 'Medial',
            url: '/user/services/medical'
        },
        {
            title: 'Health',
            url: '/user/services/health'
        }
    ]
    const CompanyNavbarServiceOptions = [
        {
            title: 'About',
            url: ''
        }
    ]
    const HelpNavbarServiceOptions = [
        {
            title: 'Contact',
            url: ''
        },
        {
            title: 'Staff',
            url: ''
        }
    ]
    const handleLogOut = () => {
        dispatch(logoutUser());
        navigate('/user')
    }
    const handleHomeClick = () => {
        if (!userDetails || userDetails?.profile == 'user') {
            navigate('/user')
        } else if (userDetails?.profile == 'staff') {
            navigate('/staff')
        } else {
            navigate('/admin')
        }
    }
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [moreAnchorEl, setMoreAnchorEl] = React.useState(null);
    const [mobileAnchorEl, setMobileAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileAnchorEl);
    const isMobileMoreMenuOpen = Boolean(mobileMoreAnchorEl);
    const [showSearchBar, setShowSearchBar] = React.useState(false);
    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileAnchorEl(null);
    };
    const handleMobileMoreMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMoreMenuClose = () => {
        setMoreAnchorEl(null);
        handleMobileMoreMenuClose();
    };
    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMoreMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };
    const handleMobileMenuOpen = (event) => {
        setMobileAnchorEl(event.currentTarget);
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
            {
                !userDetails || userDetails?.profile == 'user'
                    ?
                    <MenuItem onClick={() => { navigate(`/user/${userDetails?._id}/applications`) }}>My Applications</MenuItem>
                    :
                    null
            }
            <MenuItem sx={{ display: { xs: 'none', md: 'flex' } }} onClick={handleLogOut}>LogOut</MenuItem>
        </Menu>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileAnchorEl}
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
            <MenuItem onClick={handleHomeClick}>
                <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                    <HomeIcon />
                </IconButton>
                <p>Home</p>
            </MenuItem>
            {
                userDetails ?
                    <>
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
                            <p onClick={handleLogOut}>LogOut</p>
                        </MenuItem>
                    </>
                    :
                    <MenuItem onClick={()=>navigate('/sign-in')}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="primary-search-account-menu"
                            aria-haspopup="true"
                            color="inherit"
                        >
                            <LoginIcon />
                        </IconButton>
                        <p onClick={handleLogOut}>LogIn</p>
                    </MenuItem>
            }

        </Menu>
    );

    const mobileMoreMenuId = 'primary-search-more-account-menu-mobile';
    const renderMobileMenuSubNavOptions = (
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
            open={isMobileMoreMenuOpen}
            onClose={handleMobileMoreMenuClose}
        >

            <MenuItem>
                <IconButton
                    size="large"
                    aria-label="show 17 new notifications"
                    color="inherit"
                >
                    <HelpIcon />
                </IconButton>
                <p>Help</p>
            </MenuItem>
            <MenuItem >
                <MobileAccordion />
            </MenuItem>
        </Menu>
    )
    const [showSpeedDial, setShowSpeedDial] = React.useState(false);
    const handleCloseSearchBar = () => {
        setShowSearchBar((prev) => !prev);
        dispatch(setSearchQuery(""));
        setSearchValue("")
    }
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
                        sx={{ color: 'black', fontWeight: '600', display: { xs: 'none', sm: 'block' } }}
                    >
                        Digital_Gram_Panchayat_Services
                    </Typography>
                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ color: 'grey', fontWeight: '600', width: { md: '40%' }, display: { xs: 'none', md: 'flex' }, justifyContent: 'space-evenly', alignItems: 'center' }}>
                        <Box id="callSpeedDial" onClick={() => setShowSpeedDial((state) => !state)} sx={{ border: showSpeedDial ? '1px solid blue' : 'none', position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <Typography id='callSpeedDialText' variant='span'
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
                                    position: 'absolute', top: '100%', width: '35vw', height: '30vh', padding: '10px', zIndex: 100
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
                            userDetails && userDetails.profile != 'guest'
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
                            color="black"
                        >
                            <MenuIcon />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            <Box sx={{ backgroundColor: '#29388c', display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', fontSize: '15px', fontWeight: '600', color: 'whitesmoke' }}>
                <Box sx={{ padding: '5px 0px', width: '60%', display: { xs: 'none', md: 'flex' }, justifyContent: 'space-evenly', alignItems: 'center' }}>
                    <Box onClick={handleHomeClick} sx={{ display: 'flex', alignItems: 'center', padding: '10px 20px', '&:hover': { cursor: 'pointer' } }}>
                        <Typography variant='span'>Home</Typography>
                    </Box>
                    {
                        userDetails?.profile == 'staff'
                            ?
                            <NavbarSpeedDial title={'Services'} options={staffNavbarServiceOptions} />
                            :
                            <NavbarSpeedDial title={"services"} options={userNavbarServiceOptions} />
                    }
                    <NavbarSpeedDial title={"Company"} options={CompanyNavbarServiceOptions} />
                    <NavbarSpeedDial title={"Help"} options={HelpNavbarServiceOptions} />
                </Box>
                <Box sx={{ width: { xs: '80%', md: '40%' }, display: 'flex', justifyContent: { xs: 'flex-start', md: 'center' } }}>
                    <Box onClick={() => setShowSearchBar((prev) => !prev)}
                        sx={{ display: showSearchBar ? "none" : 'flex', backgroundColor: '#066acf', margin: { xs: '0px 10px', md: '0px' }, padding: '5px 10px', borderRadius: '5px' }}>
                        <SearchIcon />
                    </Box>
                    <Search sx={{ display: showSearchBar ? "flex" : 'none', marginRight: '0', borderTopRightRadius: '0', borderBottomRightRadius: '0' }}>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search…"
                            value={searchValue} // Controlled component
                            inputProps={{ 'aria-label': 'search' }}
                            onChange={(event) => { dispatch(setSearchQuery(event.target.value)), setSearchValue(event.target.value) }}
                        />
                    </Search>
                    <Typography variant='span'
                        onClick={handleCloseSearchBar}
                        sx={{
                            '&:hover': { cursor: 'pointer' },
                            backgroundColor: '#d1cbcb36', borderLeft: '1px solid grey', borderTopRightRadius: '5px', borderBottomRightRadius: '5px',
                            padding: '0px 8px', display: showSearchBar ? "flex" : 'none', alignItems: 'center'
                        }}>
                        X
                    </Typography>
                </Box>
                <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                    <IconButton
                        size="large"
                        aria-label="show more"
                        aria-controls={mobileMoreMenuId}
                        aria-haspopup="true"
                        onClick={handleMobileMoreMenuOpen}
                    >
                        <MoreIcon sx={{ color: 'whitesmoke' }} />
                    </IconButton>
                </Box>
                {renderMobileMenuSubNavOptions}
            </Box>
            {renderMobileMenu}
            {renderMenu}
        </Box>
    );
}
