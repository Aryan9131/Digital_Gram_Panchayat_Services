import * as React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Check from '@mui/icons-material/Check';
import SettingsIcon from '@mui/icons-material/Settings';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import VideoLabelIcon from '@mui/icons-material/VideoLabel';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import { Typography } from '@mui/material';


const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor: '#eaeaf0',
    borderRadius: 1,
    ...theme.applyStyles('dark', {
      backgroundColor: theme.palette.grey[800],
    }),
  },
}));


const steps = ['Applied', 'Documents Verification', 'Approved'];
// Mapping rejection statuses to steps
const rejectionStepMapping = {
  "StaffRejected": "Documents Verification",
  "AdminRejected": "Approved",
};

export function ApplicationStatusTracker({status, reason}) {
    let stepIdx=steps.indexOf(status);
    if(status=='StaffRejected'){
      stepIdx=1
    }else if(status=='AdminRejected'){
      stepIdx=2;
    }
    const errorStep = rejectionStepMapping[status] || null;
  return (
    <Stack sx={{ width: '100%' }} spacing={4}>
      <Stepper alternativeLabel activeStep={stepIdx || 0} connector={<ColorlibConnector />}>
        {steps.map((label) => {
           const labelProps = {};
           if (label==errorStep) {
            labelProps.optional = (
              <Typography variant="caption" color="error">
                 {reason}
              </Typography>
            );

            labelProps.error = true;
          }
          return (<Step key={label}>
            <StepLabel {...labelProps} >{label}</StepLabel>
          </Step>)
         })}
      </Stepper>
    </Stack>
  );
}
