import { Box, Button, Divider, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateUserProfile } from '../features/userSlice'
import { useNavigate } from 'react-router-dom'

export const UserProfile = () => {
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const { userDetails } = useSelector((state) => state.user);
    const [showForm, setShowForm] = useState(false);
    const [name, setName] = useState(userDetails?.name);
    const [email, setEmail] = useState(userDetails?.email);
    const [number, setNumber] = useState(userDetails?.number);
    const [password, setPassword] = useState(userDetails?.password);
    useEffect(()=>{
        if(userDetails){
            setName(userDetails.name);
            setEmail(userDetails.email);
            setNumber(userDetails.number)
            setPassword(userDetails.password)
        }
    },[userDetails])
    const handleUpdateProfile =()=>{
        const obj={
            name:name,
            email:email,
            number:number,
            password:password,
            profile:userDetails?.profile
        }
      dispatch(updateUserProfile({userId:userDetails._id, updates:obj}))
      setShowForm(false);
    
    }
    return (
        <Box sx={{  width: '100vw',margin:'10px 0px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            {
                showForm
                    ?
                    <Box sx={{ width: { xs: '90%', md: '50%' },border: '1px solid grey', borderRadius: '6px', backgroundColor: 'whitesmoke', display: 'flex', flexDirection: 'column', padding: '10px' }}>
                        <Box sx={{ backgroundColor: 'whitesmoke', padding: '8px 2px' }}>
                            <Typography variant='span' sx={{ fontWeight: '600', fontSize: '1.6rem' }}>Name : </Typography>
                            <TextField value={name} onChange={(e)=>setName(e.target.value)} />
                        </Box>
                        <Divider />
                        <Box sx={{ backgroundColor: 'whitesmoke', padding: '8px 2px' }}>
                            <Typography variant='span' sx={{ fontWeight: '600', fontSize: '1.6rem' }}>Email : </Typography>
                            <TextField value={email} onChange={(e)=>setEmail(e.target.value)} />
                        </Box>
                        <Divider />
                        <Box sx={{ backgroundColor: 'whitesmoke', padding: '8px 2px' }}>
                            <Typography variant='span' sx={{ fontWeight: '600', fontSize: '1.6rem' }}>Number : </Typography>
                            <TextField value={number} onChange={(e)=>setNumber(e.target.value)} />
                        </Box>
                        <Divider />
                        <Box sx={{ backgroundColor: 'whitesmoke', padding: '8px 2px' }}>
                            <Typography variant='span' sx={{ fontWeight: '600', fontSize: '1.6rem' }}>Password : </Typography>
                            <TextField value={password} onChange={(e)=>setPassword(e.target.value)} />
                        </Box>
                        <Divider />
                        <Box sx={{ backgroundColor: 'whitesmoke', padding: '8px 2px' }}>
                            <Typography variant='span' sx={{ fontWeight: '600', fontSize: '1.6rem' }}>Profile : </Typography>
                            <TextField value={userDetails?.profile} aria-readonly />
                        </Box>
                        <Divider sx={{ margin: '5px 0px' }} />
                        <Button variant='contained' onClick={handleUpdateProfile}>Update</Button>
                    </Box>

                    :
                    <Box sx={{ width: { xs: '90%', md: '50%' }, height: '90%', border: '1px solid grey', borderRadius: '6px', backgroundColor: 'whitesmoke', display: 'flex', flexDirection: 'column', padding: '10px' }}>
                        <Box sx={{ backgroundColor: 'whitesmoke', padding: '8px 2px' }}>
                            <Typography variant='span' sx={{ fontWeight: '600', fontSize: '1.6rem' }}>Name : </Typography>
                            <Typography variant='span' sx={{ fontWeight: '600', fontSize: '1.6rem', color: '#414141' }}>{userDetails?.name} </Typography>
                        </Box>
                        <Divider />
                        <Box sx={{ backgroundColor: 'whitesmoke', padding: '8px 2px' }}>
                            <Typography variant='span' sx={{ fontWeight: '600', fontSize: '1.6rem' }}>Email : </Typography>
                            <Typography variant='span' sx={{ fontWeight: '600', fontSize: '1.6rem', color: '#414141' }}>{userDetails?.email} </Typography>
                        </Box>
                        <Divider />
                        <Box sx={{ backgroundColor: 'whitesmoke', padding: '8px 2px' }}>
                            <Typography variant='span' sx={{ fontWeight: '600', fontSize: '1.6rem' }}>Number : </Typography>
                            <Typography variant='span' sx={{ fontWeight: '600', fontSize: '1.6rem', color: '#414141' }}>{userDetails?.number} </Typography>
                        </Box>
                        <Divider />
                        <Box sx={{ backgroundColor: 'whitesmoke', padding: '8px 2px' }}>
                            <Typography variant='span' sx={{ fontWeight: '600', fontSize: '1.6rem' }}>Password : </Typography>
                            <Typography variant='span' sx={{ fontWeight: '600', fontSize: '1.6rem', color: '#414141' }}>{userDetails?.password} </Typography>
                        </Box>
                        <Divider sx={{ margin: '5px 0px' }} />
                        <Box sx={{ backgroundColor: 'whitesmoke', padding: '8px 2px' }}>
                            <Typography variant='span' sx={{ fontWeight: '600', fontSize: '1.6rem' }}>Profile : </Typography>
                            <Typography variant='span' sx={{ fontWeight: '600', fontSize: '1.6rem', color: '#414141' }}>{userDetails?.profile} </Typography>
                        </Box>
                        <Divider sx={{ margin: '5px 0px' }} />
                        <Button variant='contained' onClick={()=>{setShowForm((state)=>!state)}}>Edit</Button>
                    </Box>
            }
        </Box>
    )
}
