import * as React from 'react';
import { Box, Button, TextField, Typography, FormControl, Divider, IconButton, Input } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { loginUser } from "../features/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { MoreMenu } from './ServiceMoreMenu';
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useTheme } from '@mui/material/styles';
import Chip from '@mui/material/Chip';
import { updateCurrentService } from '../features/adminSlice';
// import {services} from '../api/userApi'
const ITEM_HEIGHT = 30;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const names = [
    'Adhaar Card',
    'Birth Certificate',
    'Driving Licience',
    'EWS Certificate',
    'Graduation Degree',
    'Kishan Card',
    'Pan Card',
    'Rashan Card',
    'Samgra Id',
    'Voter Id'
];

function getStyles(name, personName, theme) {
    return {
        fontWeight: personName?.includes(name)
            ? theme.typography.fontWeightMedium
            : theme.typography.fontWeightRegular,
    };
}
export function UpdateService() {
    const dispatch = useDispatch();
    const { services, loading } = useSelector((state) => state.admin);
    const { userDetails } = useSelector((state) => state.user)
    const navigate = useNavigate();
    const { id } = useParams();
    const theme = useTheme();
    const [service, setService] = React.useState(undefined)
    const [documents, setDocuments] = React.useState([]);

    React.useEffect(() => {
        // Update local state when the Redux store updates
        if (services && services.length>0) {
            const fetchedService = services.find((service) => service._id === id);
            setService(fetchedService);
            setDocuments(fetchedService.documents_required)
        }
    }, [services, id]);

    const handleValueChange = (e) => {
        setService((state) => {
            return {
                ...state,
                [e.target.name]: e.target.value
            }
        })
    }
    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setDocuments(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
        setService((state)=>{
            return {
                ...state,
                documents_required:typeof value === 'string' ? value.split(',') : value
            }
        })
    };

    const handleUpdateService = () => {
        dispatch(updateCurrentService({ serviceId: service._id, serviceData: service }))
        navigate(`/admin/service-details/${service._id}`)
    }

    // Render loading or fallback message if services are not yet fetched
    if (loading) {
        return <Typography>Loading services...</Typography>;
    }

    return (
        <Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Box id='serviceDetailHeader' sx={{ padding: '3px 0px', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', width: '96%' }}>
                <Box id="service" sx={{ width: '100%', display: 'flex', alignItems: 'center' }}>
                    <Box sx={{ width: { xs: '90%', md: '80%' }, display: 'flex', alignItems: 'center' }}>
                        <Typography variant='h5' sx={{ fontWeight: 'bold' }}>Service :</Typography>
                        <TextField id="standard-basic" autoFocus variant="standard"
                            name='service'
                            value={service?.service}
                            onChange={handleValueChange}
                            sx={{
                                marginLeft: '10px',
                                "& .MuiInput-underline:before": {
                                    borderBottom: "none", // Remove default bottom border
                                },
                                "& .MuiInput-underline:after": {
                                    borderBottom: "none", // Prevent focus border
                                },
                                "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
                                    borderBottom: "none", // Remove hover effect
                                },
                            }}
                            InputProps={{
                                style: { fontSize: '1.5rem', fontWeight: 'bold', color: '#4c4d4cv' }, // Apply font styles here
                            }}
                        />
                    </Box>
                    <Button variant='outlined'
                        onClick={handleUpdateService}>
                        Update
                    </Button>
                </Box>
            </Box>
            <Divider sx={{ width: '100%', margin: '7px 0px' }} />
            <Box id='serviceDetailBody' sx={{ width: '96%', overflowY: 'auto', height: { xs: '75vh', md: '70vh' } }}>
                <Box sx={{ width: { xs: '100%', md: '80%' }, padding: '15px 0px' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography sx={{ fontWeight: 'bold', color: 'black' }}>Admin :</Typography>
                        <TextField id="standard-basic" variant="standard" disabled name='admin' value={userDetails?.name}
                            sx={{
                                marginLeft: '10px', fontWeight: 'bold', color: 'text.secondary',
                                "& .MuiInput-underline:before": {
                                    borderBottom: "none", // Remove default bottom border
                                },
                                "& .MuiInput-underline:after": {
                                    borderBottom: "none", // Prevent focus border
                                },
                                "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
                                    borderBottom: "none", // Remove hover effect
                                },
                            }}
                            InputProps={{
                                style: { fontWeight: 'bold', color: '#4c4d4c' }, // Apply font styles here
                            }}
                        />

                    </Box>
                    <Divider sx={{ width: '100%', margin: '7px 0px' }} />
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography sx={{ fontWeight: 'bold', color: 'black' }}>Department :</Typography>
                        <TextField id="standard-basic" variant="standard" disabled name='department' value={userDetails?.department}
                            sx={{
                                marginLeft: '10px', fontWeight: 'bold', color: 'text.secondary',
                                "& .MuiInput-underline:before": {
                                    borderBottom: "none", // Remove default bottom border
                                },
                                "& .MuiInput-underline:after": {
                                    borderBottom: "none", // Prevent focus border
                                },
                                "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
                                    borderBottom: "none", // Remove hover effect
                                },
                            }}
                            InputProps={{
                                style: { fontWeight: 'bold', color: '#4c4d4c' }, // Apply font styles here
                            }}
                        />
                    </Box>
                    <Divider sx={{ width: '100%', margin: '7px 0px' }} />
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography sx={{ fontWeight: 'bold', color: 'black' }}>Type :</Typography>
                        <FormControl
                            required
                            variant="standard"
                            sx={{ marginLeft: '10px' }}
                        >
                            <Select
                                id="profile-select"
                                name='type'
                                value={service?.type || ''} // Use a fallback value
                                onChange={handleValueChange}
                                sx={{
                                    fontWeight: 'bold',
                                    color: '#4c4d4c', // Custom font color
                                }}
                                MenuProps={{
                                    PaperProps: {
                                        style: {
                                            fontWeight: 'bold',
                                            color: '#4c4d4c', // Menu items font styles
                                        },
                                    },
                                }}
                            >
                                <MenuItem value="paid" sx={{ fontWeight: 'bold', color: '#4c4d4c' }}>paid</MenuItem>
                                <MenuItem value="free" sx={{ fontWeight: 'bold', color: '#4c4d4c' }}>free</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                    <Divider sx={{ width: '100%', margin: '7px 0px' }} />
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography sx={{ fontWeight: 'bold', color: 'black' }}>Fees(in rupees) :</Typography>
                        <TextField
                            id="standard-basic"
                            type="number"
                            variant="standard"
                            name='fees'
                            value={service?.fees}
                            onChange={handleValueChange}
                            sx={{ marginLeft: '10px' }}
                            InputProps={{
                                style: { fontWeight: 'bold', color: '#4c4d4c' }, // Apply font styles here
                            }}
                        />
                    </Box>
                    <Divider sx={{ width: '100%', margin: '7px 0px' }} />
                    <Box sx={{ padding: '10px 0px', display: 'flex', alignItems: 'flex-start', width: '100%', margin: '10px 0px' }}>
                        <Typography sx={{ fontWeight: 'bold', color: 'black' }}>Details :</Typography>
                        <TextField multiline id="standard-multiline-flexible" variant="standard" value={service?.details}
                            onChange={handleValueChange}
                            name='details'
                            sx={{
                                marginLeft: '10px', fontWeight: 'bold', color: 'text.secondary', width: '85%',
                                "& .MuiInput-underline:before": {
                                    borderBottom: "none", // Remove default bottom border
                                },
                                "& .MuiInput-underline:after": {
                                    borderBottom: "none", // Prevent focus border
                                },
                                "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
                                    borderBottom: "none", // Remove hover effect
                                },
                            }}
                            InputProps={{
                                style: { fontWeight: 'bold', color: '#4c4d4c' }, // Apply font styles here
                            }}
                        />
                    </Box>
                    <Divider sx={{ width: '100%', margin: '7px 0px' }} />

                    <Box sx={{ padding: '10px 0px', display: 'flex', alignItems: 'center', margin: '10px 0px' }}>
                        <Typography sx={{ fontWeight: 'bold', color: 'black' }}>Documents Required :</Typography>
                        <FormControl sx={{ m: 1, width: 300 }}>
                            <Select
                                id="demo-multiple-chip"
                                multiple
                                name='documents_required'
                                value={documents}
                                onChange={handleChange}
                                input={<Input id="select-multiple-chip" label="Chip" />}
                                renderValue={(selected) => (
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                        {selected.map((value) => (
                                            <Chip key={value} label={value} />
                                        ))}
                                    </Box>
                                )}
                                MenuProps={MenuProps}
                            >
                                {names.map((name) => (
                                    <MenuItem
                                        key={name}
                                        value={name}
                                        style={getStyles(name, documents, theme)}
                                    >
                                        {name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>
                    <Box sx={{ padding: '10px 0px', display: 'flex', alignItems: 'center', margin: '10px 0px' }}>
                        <Typography sx={{ fontWeight: 'bold', color: 'black' }}>Last Date :</Typography>
                        <TextField id="standard-basic" name='last_date' type='date' onChange={handleValueChange} value={service?.last_date} variant="standard" sx={{ marginLeft: '10px', fontWeight: 'bold', color: 'text.secondary' }} />
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}
