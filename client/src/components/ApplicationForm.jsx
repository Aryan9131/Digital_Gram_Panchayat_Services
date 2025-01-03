import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, Divider, TextField, Typography } from '@mui/material';
import { createNewApplication } from '../features/userSlice';
import { useImgPreview } from '../hooks/handleImgPreview';

export function ApplicationForm() {
  const { handleMediaChange, mediaUrl, clearMedia } = useImgPreview();
  const [fileDetails, setFileDetails] = useState({}); // State to store file details
  const [fileMediaUrlDetails, setFileMediaUrlDetails] = useState({}); // State to store file details
  const services = useSelector((state) => state.user.services);
  const [currentService, setCurrentService] = useState(undefined);
  const navigate = useNavigate();
  const { userDetails } = useSelector((state) => state.user);
  const {currentApplicationId} =useSelector((state)=>state.user);
  
  const { id } = useParams();
  const [ name, setName ] = useState("");
  const [ email, setEmail ] = useState("");
  const [ number, setNumber ] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    if (services && id) {
      const fetchedService = services.find((service) => service._id === id);
      setCurrentService(fetchedService);
    }
  }, [services, id]);

  useEffect(()=>{
     if(currentApplicationId){
         navigate(`/user/application/${currentApplicationId}`)
     }
  },[currentApplicationId])
  const uploadMultipleFilesToCloudinary = async () => {
    try {
      // Use Promise.all to upload files in parallel
        const uploadPromises = Object.entries(fileDetails).map(async ([key, file]) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'Digital-Gram-Panchayat');
        formData.append('cloud_name', "anayak")
        const cloudinaryResponse = await fetch('https://api.cloudinary.com/v1_1/anayak/image/upload', {
          method: 'POST',
          body: formData
        });
        const cloudinaryData = await cloudinaryResponse.json();

        // Return the formatted object
        return {
          [key]: {
            imgUrl: cloudinaryData.url, // URL of the uploaded image
            publicKey: cloudinaryData.public_id, // Cloudinary public key
          },
        };
      });

      const uploadedFilesData = await Promise.all(uploadPromises);
      handleApplicationSubmit(uploadedFilesData);
    } catch (error) {
      console.error('Error uploading files:', error);
      throw error;
    }
  };

  // Handle file selection
  const handleFileChange = (docType, file) => {
    setFileDetails((prev) => ({
      ...prev,
      [docType]: file, // Update the file for the specific document type
    }));
    handleMediaChange(docType, file, handleMediaUrlChange)
  };
  const handleMediaUrlChange = (docType, url) => {
    setFileMediaUrlDetails((prev) => ({
      ...prev,
      [docType]: url
    }))
  }
  // Submit the form
  const handleApplicationSubmit = (uploadedFilesData) => {
    const ApplictionData = {
      userId: userDetails._id,
      service:currentService.service,
      serviceId: id,
      fullName: name, // Replace with actual input values
      number: number,
      email: email,
      status:'Applied',
      documents: uploadedFilesData, // Include file details
    };
    dispatch(createNewApplication(ApplictionData, parseInt(currentService.applicants)))
  }
  
  return (
    <Box sx={{ width: '100vw', height: '100vh', backgroundColor: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Box id='applicationForm' sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '15px 0px', border: '1px solid grey', width: '95%', height: '70vh', overflowY: 'auto', backgroundColor: 'whitesmoke' }}>
        <Box sx={{ width: '98%', padding: '10px 0px', backgroundColor: 'whitesmoke', display: 'flex', alignItems: 'center' }}>
          <Typography sx={{ width: '20%', fontWeight: 'bold', fontSize: '1.2rem', color: 'black' }}>Full Name :</Typography>
          <TextField variant='standard' placeholder='Name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            sx={{
              width: '80%',
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
        <Divider sx={{ width: '98%' }} />
        <Box sx={{ width: '98%', padding: '10px 0px', backgroundColor: 'whitesmoke', display: 'flex', alignItems: 'center' }}>
          <Typography sx={{ width: '20%', fontWeight: 'bold', fontSize: '1.2rem', color: 'black' }}>Number :</Typography>
          <TextField variant='standard' placeholder='Number'
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            sx={{
              width: '80%',
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
        <Divider sx={{ width: '98%' }} />
        <Box sx={{ width: '98%', padding: '10px 0px', backgroundColor: 'whitesmoke', display: 'flex', alignItems: 'center' }}>
          <Typography sx={{ width: '20%', fontWeight: 'bold', fontSize: '1.2rem', color: 'black' }}>Email :</Typography>
          <TextField variant='standard' placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{
              width: '80%',
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
        <Divider sx={{ width: '98%' }} />
        <Box sx={{ width: '98%', padding: '10px 0px', backgroundColor: 'whitesmoke', display: 'flex', alignItems: 'center' }}>
          <Typography sx={{ width: '20%', fontWeight: 'bold', fontSize: '1.2rem', color: 'black' }}>Documents :</Typography>
          <Box sx={{ width: '80%', display: 'flex', flexDirection: 'column' }}>
            {currentService
              ? currentService.documents_required.map((doc, index) => (
                <Box key={index} sx={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                  <Typography sx={{ width: '20%' }}>{doc} :</Typography>
                  <TextField
                    type="file"
                    onChange={(e) => handleFileChange(doc, e.target.files[0])} // Handle file selection
                    sx={{ width: '30%', marginRight: '3px' }}
                  />
                  <Box sx={{ width: '45%', height: '100px' }}>
                    <img src={fileMediaUrlDetails[doc]} alt="img" style={{ width: '100%', height: '100px' }} />
                  </Box>
                </Box>
              ))
              : null}
          </Box>
        </Box>
        <Divider sx={{ width: '100%' }} />
        <Box sx={{ width: '98%', padding: '10px 0px', backgroundColor: 'whitesmoke', display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
          <Button variant='contained' onClick={uploadMultipleFilesToCloudinary}>Apply</Button>
        </Box>
      </Box>
    </Box>
  );
}
