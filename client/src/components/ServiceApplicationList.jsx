import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getServiceApplications } from '../features/staffSlice';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Box, Typography, Button, Divider } from '@mui/material';

const AllServiceApplication = () => {
    const { currentServiceAllAplications } = useSelector((state) => state.staff);
    const navigate = useNavigate()

    return (
        <Box sx={{ width: '100%', height: '100%', backgroundColor: 'whitesmoke' }}>
            {
                currentServiceAllAplications?.map((application, index) => {
                    return (
                        <Box key={index} sx={{ width: '100%', height: '30px', padding: '5px 0px', backgroundColor: 'whitesmoke', display: 'flex', justifyContent: 'space-between' }}>
                            <Typography>{index + 1}.</Typography>
                            <Typography>{application.fullName}</Typography>
                            <Typography sx={{ color: 'blue', textDecoration: 'underline', '&:hover': { cursor: 'pointer' } }} onClick={() => { navigate(`/staff/application/${application._id}`) }}>view</Typography>
                            {
                                application.status == 'Applied'
                                    ?
                                    <Box sx={{ width: '20%', display: 'flex', justifyContent: 'space-around' }}>
                                        <Button variant="contained" >Approve</Button>
                                        <Button variant="contained" sx={{ backgroundColor: 'red' }}>Reject</Button>
                                    </Box>
                                    :
                                    (
                                        application.status == 'Documents Verification' || application.status == 'Approved'
                                            ?
                                            <Box sx={{ width: '20%', display: 'flex', justifyContent: 'space-around' }}>
                                                <Button variant="contained">Approved</Button>
                                            </Box>
                                            :
                                            application.status == 'StaffRejected' || application.status == 'AdminRejected'
                                                ?
                                                <Box sx={{ width: '20%', display: 'flex', justifyContent: 'space-around' }}>
                                                    <Button variant="contained" sx={{ backgroundColor: 'red' }}>Rejected</Button>
                                                </Box>
                                                :
                                                null
                                    )
                            }
                        </Box>
                    )
                })
            }
        </Box>
    )
}
const AllAppliedServiceApplication = () => {
    const { currentServiceAllAplications } = useSelector((state) => state.staff);
    console.log('All Applied List Called !');
    console.log('currentServiceAllAplications --> ' + JSON.stringify(currentServiceAllAplications));
    const navigate = useNavigate()
    return (
        <Box sx={{ width: '100%', height: '100%', backgroundColor: 'whitesmoke' }}>
            {
                currentServiceAllAplications?.map((application, index) => {
                    if (application.status == 'Applied') {
                        return (
                            <Box key={index} sx={{ width: '100%', height: '30px', padding: '5px 0px', backgroundColor: 'whitesmoke', display: 'flex', justifyContent: 'space-between' }}>
                                <Typography>{index + 1}.</Typography>
                                <Typography>{application.fullName}</Typography>
                                <Typography sx={{ color: 'blue', textDecoration: 'underline', '&:hover': { cursor: 'pointer' } }} onClick={() => { navigate(`/staff/application/${application._id}`) }}>view</Typography>
                                <Box sx={{ width: '20%', display: 'flex', justifyContent: 'space-around' }}>
                                    <Button variant="contained" >Approve</Button>
                                    <Button variant="contained" sx={{ backgroundColor: 'red' }}>Reject</Button>
                                </Box>
                            </Box>
                        )
                    }
                })
            }
        </Box>
    )
}
const StaffVerifiedServiceApplication = () => {
    const { currentServiceAllAplications } = useSelector((state) => state.staff);
    const navigate = useNavigate()

    return (
        <Box sx={{ width: '100%', height: '100%', backgroundColor: 'whitesmoke' }}>
            {
                currentServiceAllAplications?.map((application, index) => {
                    if (application.status == 'Documents Verification') {
                        return (
                            <Box key={index} sx={{ width: '100%', height: '30px', padding: '5px 0px', backgroundColor: 'whitesmoke', display: 'flex', justifyContent: 'space-between' }}>
                                <Typography>{index + 1}.</Typography>
                                <Typography>{application.fullName}</Typography>
                                <Typography sx={{ color: 'blue', textDecoration: 'underline', '&:hover': { cursor: 'pointer' } }} onClick={() => { navigate(`/staff/application/${application._id}`) }}>view</Typography>
                                <Box sx={{ width: '20%', display: 'flex', justifyContent: 'space-around' }}>
                                    <Button variant="contained" >Staff Approved</Button>
                                </Box>
                            </Box>
                        )
                    }
                })
            }
        </Box>
    )
}
const StaffRejectedServiceApplication = () => {
    const { currentServiceAllAplications } = useSelector((state) => state.staff);
    const navigate = useNavigate()

    return (
        <Box sx={{ width: '100%', height: '100%', backgroundColor: 'whitesmoke' }}>
            {
                currentServiceAllAplications?.map((application, index) => {
                    if (application.status == 'StaffRejected') {
                        return (
                            <Box key={index} sx={{ width: '100%', height: '30px', padding: '5px 0px', backgroundColor: 'whitesmoke', display: 'flex', justifyContent: 'space-between' }}>
                                <Typography>{index + 1}.</Typography>
                                <Typography>{application.fullName}</Typography>
                                <Typography sx={{ color: 'blue', textDecoration: 'underline', '&:hover': { cursor: 'pointer' } }} onClick={() => { navigate(`/staff/application/${application._id}`) }}>view</Typography>
                                <Box sx={{ width: '20%', display: 'flex', justifyContent: 'space-around' }}>
                                    <Button variant="contained" sx={{ backgroundColor: 'red' }}>Rejected</Button>
                                </Box>
                            </Box>
                        )
                    }
                })
            }
        </Box>
    )
}
const AdminVerifiedServiceApplication = () => {
    const { currentServiceAllAplications } = useSelector((state) => state.staff);
    const navigate = useNavigate()

    return (
        <Box sx={{ width: '100%', height: '100%', backgroundColor: 'whitesmoke' }}>
            {
                currentServiceAllAplications?.map((application, index) => {
                    if (application.status == 'Approved') {
                        return (
                            <Box key={index} sx={{ width: '100%', height: '30px', padding: '5px 0px', backgroundColor: 'whitesmoke', display: 'flex', justifyContent: 'space-between' }}>
                                <Typography>{index + 1}.</Typography>
                                <Typography>{application.fullName}</Typography>
                                <Typography sx={{ color: 'blue', textDecoration: 'underline', '&:hover': { cursor: 'pointer' } }} onClick={() => { navigate(`/staff/application/${application._id}`) }}>view</Typography>
                                <Box sx={{ width: '20%', display: 'flex', justifyContent: 'space-around' }}>
                                    <Button variant="contained" sx={{ backgroundColor: 'green' }}>Approved</Button>
                                </Box>
                            </Box>
                        )
                    }
                })
            }
        </Box>
    )
}
const AdminRejectedServiceApplication = () => {
    const { currentServiceAllAplications } = useSelector((state) => state.staff);
    const navigate = useNavigate()

    return (
        <Box sx={{ width: '100%', height: '100%', backgroundColor: 'whitesmoke' }}>
            {
                currentServiceAllAplications?.map((application, index) => {
                    if (application.status == 'StaffRejected') {
                        return (
                            <Box key={index} sx={{ width: '100%', height: '30px', padding: '5px 0px', backgroundColor: 'whitesmoke', display: 'flex', justifyContent: 'space-between' }}>
                                <Typography>{index + 1}.</Typography>
                                <Typography>{application.fullName}</Typography>
                                <Typography sx={{ color: 'blue', textDecoration: 'underline', '&:hover': { cursor: 'pointer' } }} onClick={() => { navigate(`/staff/application/${application._id}`) }}>view</Typography>
                                <Box sx={{ width: '20%', display: 'flex', justifyContent: 'space-around' }}>
                                    <Button variant="contained" sx={{ backgroundColor: 'red' }}>Rejected</Button>
                                </Box>
                            </Box>
                        )
                    }
                })
            }
        </Box>
    )
}
const RenderList = ({ listType }) => {
    switch (listType) {
        case "All":
            return <AllServiceApplication />
            break;
        case "Applied":
            return <AllAppliedServiceApplication />
            break;
        case "StaffVerified":
            return <StaffVerifiedServiceApplication />
            break;
        case "StaffRejected":
            return <StaffRejectedServiceApplication />
            break;
        case "AdminVerified":
            return <AdminVerifiedServiceApplication />
            break;
        case "AdminRejected":
            return <AdminRejectedServiceApplication />
            break;
        default:
            break;
    }
}
export const SelectOptions = ({listType,handleChange}) => {
    const { userDetails } = useSelector((state) => state.user)
    if (userDetails?.profile == 'staff') {
        return (
            <FormControl sx={{ m: 1, minWidth: 120, }} size="small">
                <InputLabel id="demo-select-small-label">Type</InputLabel>
                <Select
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    value={listType}
                    label="Applications"
                    onChange={handleChange}
                >
                    <MenuItem value={"All"}>All</MenuItem>
                    <MenuItem value={"Applied"}>Pending</MenuItem>
                    <MenuItem value={"StaffVerified"}>Approved</MenuItem>
                    <MenuItem value={"StaffRejected"}>Rejected</MenuItem>
                </Select>
            </FormControl>

        )
    } else if (userDetails?.profile == 'admin') {
        console.log(' returning admin options !')

        return (
            <FormControl sx={{ m: 1, minWidth: 120, }} size="small">
            <InputLabel id="demo-select-small-label">Type</InputLabel>
            <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={listType}
                label="Applications"
                onChange={handleChange}
            >
                <MenuItem value={"StaffVerified"}>Pending</MenuItem>
                <MenuItem value={"AdminVerified"}>Approved</MenuItem>
                <MenuItem value={"StaffRejected"}>Staff Rejected</MenuItem>
                <MenuItem value={"AdminRejected"}>Admin Rejected</MenuItem>
            </Select>
        </FormControl>
        )
    }
}
export const ServiceApplicationList = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { userDetails } = useSelector((state) => state.user)
    console.log("id get in service applications ---> " + id);
    const { currentServiceAllAplications } = useSelector((state) => state.staff)
    useEffect(() => {
        if (id) {
            dispatch(getServiceApplications(id))
        }
    }, [id])
    const [listType, setListType] = useState(
        userDetails?.profile === 'staff' ? 'Applied' : 'StaffVerified'
    );

    const handleChange = (event) => {
        console.log("Selected value:", event.target.value);
        setListType(event.target.value);
    };

    return (
        <Box sx={{ width: '100vw', height: '60vh', oberflowY: 'auto', backgroundColor: 'white', display: 'flex', justifyContent: 'center' }}>
            <Box sx={{ margin: '15px 0px', width: '95%', height: '95%', backgroundColor: 'whitesmoke', border: '1px solid grey' }}>
                <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                    <Box>
                        <Typography sx={{ fontWeight: '800', fontSize: '20px' }}>
                            {currentServiceAllAplications ? currentServiceAllAplications[0]?.service : 'Service Applications'}
                        </Typography>
                    </Box>
                    <Box>
                          <SelectOptions listType={listType} handleChange={handleChange}/>
                    </Box>
                </Box>
                <Divider sx={{ width: '100%' }} />
                <Box sx={{ width: '100%', height: '30px', padding: '5px 0px', backgroundColor: 'whitesmoke', display: 'flex', justifyContent: 'space-between' }}>
                    <Typography sx={{ fontWeight: '15px', fontWeight: "600" }}>S.NO</Typography>
                    <Typography sx={{ fontWeight: '15px', fontWeight: "600" }}>Applicant</Typography>
                    <Typography sx={{ fontWeight: '15px', fontWeight: "600" }}>Application</Typography>
                    <Box sx={{ width: '20%', display: 'flex', justifyContent: 'center' }}>
                        <Typography sx={{ fontWeight: '15px', fontWeight: "600" }}>Status</Typography>
                    </Box>
                </Box>
                <Divider sx={{ width: '100%' }} />
                <RenderList listType={listType} />
            </Box>
        </Box>
    )
}
