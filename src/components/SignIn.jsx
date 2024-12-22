import * as React from 'react';
import Box from '@mui/material/Box';
import { Button, TextField, Typography, FormControl } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function SignIn() {
    const navigate = useNavigate();
    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
        setAge(event.target.value);
    };

    return (
        <Box sx={{
            height: '100vh', width: '100vw', backgroundColor: 'whitesmoke', display: 'flex',
            flexDirection: 'column', alignContent: 'center', alignItems: 'center',
            justifyContent: 'center'
        }}>
            <Box sx={{
                display: 'flex', flexDirection: 'column', alignContent: 'center', alignItems: 'center',
                backgroundColor: 'white', width: { xs: '100%', sm: '50%', md: '30%' }
            }}>
                <Box sx={{
                    display: 'flex', flexDirection: 'column', alignContent: 'center', alignItems: 'center',
                    backgroundColor: 'white', width: '90%', margin: '10px 0px'
                }}>
                    <Typography variant='h5' sx={{ margin: '5px 0px' }}>SignIn</Typography>
                    <TextField id="email" label="Email" variant="filled" fullWidth required sx={{ marginBottom: 2 }} />
                    <TextField id="password" label="Password" variant="filled" fullWidth required sx={{ marginBottom: 2 }} />
                    <Box sx={{ margin: '5px 0px', display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
                        <Button type='submit' variant='contained'>SignIn</Button>
                    </Box>
                </Box>
                <Box sx={{
                    width: '100%',
                    color: 'grey',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}>
                    <Typography sx={{ fontSize: '15px' }}>Or</Typography>
                    <Typography variant='body2' sx={{ fontSize: '15px' }}>
                        Create an account <Typography variant='span' onClick={() => { navigate('/sign-up') }} sx={{ fontSize: '15px', color: 'blue', cursor: 'pointer' }}>SignUp</Typography>
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
}
