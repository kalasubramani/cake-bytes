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
      'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?q=80&w=1926&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    label: 'Scrumptious',
    imgPath:
      'https://images.unsplash.com/photo-1511348398635-8efff213a280?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTk0fHxmbG93ZXIlMjBjYWtlc3xlbnwwfHwwfHx8MA%3D%3D',
  },
  {
    label: 'Exquisite',
    imgPath:
      'https://images.unsplash.com/photo-1604413191066-4dd20bedf486?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDF8fHxlbnwwfHx8fHw%3D',
  },
  {
    label: 'Irresistible',
    imgPath:
      'https://images.unsplash.com/photo-1582180834946-f3d376b18376?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDEwfHx8ZW58MHx8fHx8',
  },
  {
    label: 'Delectable',
    imgPath:
      'https://images.unsplash.com/photo-1571050045617-cbbd5e68d181?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE0fHx8ZW58MHx8fHx8',
  },
  {
    label: 'Divine',
    imgPath:
      'https://images.unsplash.com/photo-1562440499-64c9a111f713?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzl8fGtpZHMlMjBiaXJ0aGRheSUyMGNha2VzfGVufDB8fDB8fHww',
  },
  {
    label: 'Delightful',
    imgPath:
      'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGtpZHMlMjBiaXJ0aGRheSUyMGNha2VzfGVufDB8fDB8fHww',
  },
  {
    label: 'Indulgent',
    imgPath:
      'https://images.unsplash.com/photo-1697157202877-622683269d7c?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    label: 'Gourmet',
    imgPath:
      'https://images.unsplash.com/photo-1586221266208-e3cc0e170a60?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzR8fGJpcnRoZGF5JTIwQ2FrZXN8ZW58MHx8MHx8fDA%3D',
  },
  {
    label: 'I want it!',
    imgPath:
      'https://images.unsplash.com/photo-1619413922783-13d5a4ed3e84?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTk5fHxmbG93ZXIlMjBjYWtlc3xlbnwwfHwwfHx8MA%3D%3D',
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