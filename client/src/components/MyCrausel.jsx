import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Import carousel styles
import { Box, Typography } from '@mui/material';
import './MyCrauselStyle.css'
export function MyCarousel() {
  return (
      <Carousel
        showThumbs={false}
        autoPlay={true}
        infiniteLoop={true}
        interval={3000}
        showIndicators={true}
      >
        <Box sx={{width:'100%', height:'300px'}}>
          <img src="/online_scams.jpeg" alt="Image 1" style={{height:'95%', width:'100%'}} />
        </Box>
        <Box sx={{width:'100%', height:'300px'}}>
          <img src="/Digital_Gram_Panchayat _Office.webp" alt="Image 2" style={{height:'95%', width:'100%'}} />
        </Box>
        <Box sx={{width:'100%', height:'300px'}}>
          <img src="/Digital_Gram_Panchayat_Banner.webp" alt="Image 3" style={{height:'95%', width:'100%'}} />
        </Box>
      </Carousel>
  );
}

