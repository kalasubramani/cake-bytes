import React from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Card, CardContent, CardMedia, Container, Typography } from "@mui/material";


const images = [
  {
    label: 'Decadent',
    imgPath:
      'https://source.unsplash.com/random/?cake[1]',
  },
  {
    label: 'Scrumptious',
    imgPath:
      'https://source.unsplash.com/random/?cake[2]',
  },
  {
    label: 'Exquisite',
    imgPath:
      'https://source.unsplash.com/random/?cake[3]',
  },
  {
    label: 'Irresistible',
    imgPath:
      'https://source.unsplash.com/random/?cake[4]',
  },
  {
    label: 'Delectable',
    imgPath:
      'https://source.unsplash.com/random/?cake[5]',
  },
  {
    label: 'Divine',
    imgPath:
      'https://source.unsplash.com/random/?cake[6]',
  },
  {
    label: 'Delightful',
    imgPath:
      'https://source.unsplash.com/random/?cake[7]',
  },
  {
    label: 'Indulgent',
    imgPath:
      'https://source.unsplash.com/random/?cake[8]',
  },
  {
    label: 'Gourmet',
    imgPath:
      'https://source.unsplash.com/random/?cake[9]',
  },
  {
    label: 'I want it!',
    imgPath:
      'https://source.unsplash.com/random/?cupcake',
  },
];
 
function FrequentlyBought() {
  return (
    <Container maxWidth="xl" sx={{ height: "25rem" }}>
      <Swiper
        // install Swiper modules
        modules={[Navigation, Pagination, A11y, Autoplay]}
        spaceBetween={5}
        slidesPerView={4}
        navigation
        pagination={{ clickable: true }}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
      >
        {images.map((image, index) => {
          return (
            <SwiperSlide key={`slide-${index}`}>
              <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                  sx={{ height: "20rem" }}
                  image={image.imgPath}
                  title={image.label}
                />
                <CardContent>
                  <Typography gutterBottom variant="caption" component="span">
                    {image.label}
                  </Typography>
                </CardContent>
              </Card>
            </SwiperSlide>
          )
        })}
      </Swiper>
    </Container>
  )
}

export default FrequentlyBought;