import * as React from 'react';
import { Box, Button, TextField, Typography, FormControl, Divider, IconButton, Input } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { loginUser } from "../features/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { services } from '../api/userApi';
import { MoreMenu } from './ServiceMoreMenu';
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useTheme } from '@mui/material/styles';
import Chip from '@mui/material/Chip';
import { createService } from '../features/adminSlice';
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
    'None',
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
        fontWeight: personName.includes(name)
            ? theme.typography.fontWeightMedium
            : theme.typography.fontWeightRegular,
    };
}
export function CreateService() {
    const {userDetails} =useSelector((state)=>state.user)
    const dispatch=useDispatch()
    const navigate = useNavigate();
    const { id } = useParams();
    const theme = useTheme();
    const [documents, setDocuments] = React.useState(['None']);
    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setDocuments(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
        dispatchService({field:'documents_required', value:documents});
    };
    
    const reducerFunction =(state, action)=>{
       return {
          ...state,
          [action.field]:action.value
       }
    }
    const handleValueChange=(e)=>{
        dispatchService({field:e.target.name, value:e.target.value})
    }
    const [service, dispatchService] =React.useReducer(reducerFunction,  {
        admin:userDetails?.name,
        adminId:userDetails?._id,
        department:userDetails?.department,
        service:'',
        type:'',
        fees:'',
        details:'',
        applicants:0,
        last_date:'',
        documents_required:[]
     })
    const handleSubmit=()=>{
        dispatch(createService({serviceData :service }))
        navigate('/admin')
    }
    return (
        <Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Box id='serviceDetailHeader' sx={{ padding: '3px 0px', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', width: '96%' }}>
                <Box id="service" sx={{width: '100%', display: 'flex', alignItems: 'center' }}>
                    <Box sx={{ width: { xs: '90%', md: '80%' }, display: 'flex', alignItems: 'center' }}>
                        <Typography variant='h5' sx={{ fontWeight: 'bold' }}>Service :</Typography>
                        <TextField id="standard-basic" autoFocus variant="standard" placeholder='...Service Name'
                           onChange={handleValueChange}
                           name='service'
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
                        onClick={() => {
                            handleSubmit();
                        }}>
                        Create
                    </Button>
                </Box>
            </Box>
            <Divider sx={{ width: '100%', margin: '7px 0px' }} />
            <Box id='serviceDetailBody' sx={{ width: '96%', overflowY: 'auto', height: { xs: '75vh', md: '70vh' } }}>
                <Box sx={{ width: { xs: '100%', md: '80%' }, padding: '15px 0px' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography sx={{ fontWeight: 'bold', color: 'black' }}>Admin :</Typography>
                        <TextField id="standard-basic" value="Aryan Nayak" disabled variant="standard"
                             sx={{
                                marginLeft: '10px', fontWeight: 'bold',
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
                                style: { fontWeight: 'bold' }, // Apply font styles here
                            }}
                        />

                    </Box>
                    <Divider sx={{ width: '100%', margin: '7px 0px' }} />
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography sx={{ fontWeight: 'bold', color: 'black' }}>Department :</Typography>
                        <TextField id="standard-basic" value='Medical' disabled variant="standard"
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
                                onChange={handleValueChange}
                                name='type'
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
                            placeholder='...type here'
                            onChange={handleValueChange}
                            name='fees'
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
                                style: { fontWeight: 'bold', color: '#4c4d4c' }, // Apply font styles here
                            }}
                        />
                    </Box>
                    <Divider sx={{ width: '100%', margin: '7px 0px' }} />
                    <Box sx={{ padding: '10px 0px', display: 'flex', alignItems: 'flex-start', width: '100%', margin: '10px 0px' }}>
                        <Typography sx={{ fontWeight: 'bold', color: 'black' }}>Details :</Typography>
                        <TextField multiline id="standard-multiline-flexible" placeholder='...service details here' variant="standard"
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

                    <Box sx={{ padding: '5px 0px', display: 'flex', alignItems: 'center' }}>
                        <Typography sx={{ fontWeight: 'bold', color: 'black' }}>Documents Required :</Typography>
                        <FormControl sx={{ m: 1, width: '40%' }}>
                            <Select
                                id="demo-multiple-chip"
                                multiple
                                value={documents}
                                onChange={handleChange}
                                input={
                                    <Input
                                        id="select-multiple-chip"
                                        disableUnderline
                                    />
                                }
                                renderValue={(selected) => (
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                        {selected.map((value) => (
                                            <Chip key={value} label={value} />
                                        ))}
                                    </Box>
                                )}
                                MenuProps={MenuProps}
                                sx={{
                                    "& .MuiOutlinedInput-notchedOutline": {
                                        border: "none", // For Outlined variant
                                    },
                                    "& .MuiInput-underline:before": {
                                        borderBottom: "none", // For standard variant (underline)
                                    },
                                    "& .MuiInput-underline:after": {
                                        borderBottom: "none", // For focused underline
                                    },
                                    "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
                                        borderBottom: "none", // For hover state
                                    },
                                }}
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
                    <Divider sx={{ width: '100%', margin: '7px 0px' }} />

                    <Box sx={{ padding: '10px 0px', display: 'flex', alignItems: 'center', margin: '10px 0px' }}>
                        <Typography sx={{ fontWeight: 'bold', color: 'black' }}>Last Date :</Typography>
                        <TextField id="standard-basic" type='date' variant="standard"
                          onChange={handleValueChange}
                          name='last_date'
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
                            }} />
                    </Box>
                    <Divider sx={{ width: '100%', margin: '7px 0px' }} />
                </Box>
            </Box>
        </Box>
    );
}
