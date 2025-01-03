import * as React from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary, {
    accordionSummaryClasses,
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import { Typography, Box, Divider } from '@mui/material';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    '&:not(:last-child)': {
        borderBottom: 0,
    },
    '&::before': {
        display: 'none',
    },
}));

const AccordionSummary = styled((props) => (
    <MuiAccordionSummary
        expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
        {...props}
    />
))(({ theme }) => ({
    backgroundColor: 'rgba(0, 0, 0, .03)',
    flexDirection: 'row-reverse',
    [`& .${accordionSummaryClasses.expandIconWrapper}.${accordionSummaryClasses.expanded}`]:
    {
        transform: 'rotate(90deg)',
    },
    [`& .${accordionSummaryClasses.content}`]: {
        marginLeft: theme.spacing(1),
    },
    ...theme.applyStyles('dark', {
        backgroundColor: 'rgba(255, 255, 255, .05)',
    }),
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

export function MobileAccordion() {
    const { userDetails } = useSelector((state) => state.user);
    const navigate= useNavigate();
    const [expanded, setExpanded] = React.useState('panel1');

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    return (
        <Box sx={{ width: '40vw' }}>
            <Accordion sx={{ width: '100%' }} expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                    <Typography component="span">Services</Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ padding: '0px' }}>
                    {
                        userDetails?.profile == 'user' || !userDetails
                            ?
                            <>
                                <Typography
                                    sx={{
                                        padding: '5px 0px',
                                        backgroundColor: 'skyblue',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        textAlign: 'center',
                                        wordWrap: 'break-word',
                                        whiteSpace: 'normal',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        width: '100%', // Ensure it fits within the container
                                    }}
                                >
                                    Health
                                </Typography>
                                <Divider />
                                <Typography
                                    sx={{
                                        padding: '5px 0px',
                                        backgroundColor: 'skyblue',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        wordWrap: 'break-word',
                                        whiteSpace: 'normal',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        width: '100%', // Ensure it fits within the container
                                    }}
                                >
                                    Medical
                                </Typography>
                            </>
                            :
                            userDetails?.profile == 'staff' || userDetails?.profile == 'admin'
                                ?
                                <>
                                    <Typography
                                       onClick={()=>{navigate('/services/previous-services')}}
                                        sx={{
                                            padding: '5px 0px',
                                            backgroundColor: 'skyblue',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            textAlign: 'center',
                                            wordWrap: 'break-word',
                                            whiteSpace: 'normal',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            width: '100%', // Ensure it fits within the container
                                        }}
                                    >
                                        Previous
                                    </Typography>
                                    <Divider />
                                    <Typography
                                          onClick={()=>{navigate('/services/deleted-services')}}
                                        sx={{
                                            padding: '5px 0px',
                                            backgroundColor: 'skyblue',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            wordWrap: 'break-word',
                                            whiteSpace: 'normal',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            width: '100%', // Ensure it fits within the container
                                        }}
                                    >
                                        Deleted
                                    </Typography>
                                </>
                                :
                                null
                    }
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
                    <Typography component="span">Company</Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ padding: '0px' }}>
                    <Typography
                        sx={{
                            padding: '5px 0px',
                            backgroundColor: 'skyblue',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            textAlign: 'center',
                            wordWrap: 'break-word',
                            whiteSpace: 'normal',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            width: '100%', // Ensure it fits within the container
                        }}
                    >
                        Health
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
                    <Typography component="span">Call Us</Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ padding: '0px' }}>
                    <Typography
                        sx={{
                            padding: '5px 0px',
                            backgroundColor: 'skyblue',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            textAlign: 'center',
                            wordWrap: 'break-word',
                            whiteSpace: 'normal',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            width: '100%', // Ensure it fits within the container
                        }}
                    >
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                        malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum dolor
                        sit amet, consectetur adipiscing elit.
                    </Typography>
                </AccordionDetails>
            </Accordion>
        </Box>
    );
}
