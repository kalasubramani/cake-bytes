import React from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Button, Card, CardActions, CardContent, CardMedia, Container, Typography } from "@mui/material";


const images = [
  {
    label: 'cake',
    imgPath:
      'https://source.unsplash.com/random/?cake[1]',
  },
  {
    label: 'cake',
    imgPath:
      'https://source.unsplash.com/random/?cake[2]',
  },
  {
    label: 'cake',
    imgPath:
      'https://source.unsplash.com/random/?cake[3]',
  },
  {
    label: 'cake',
    imgPath:
      'https://source.unsplash.com/random/?cake[4]',
  },
  {
    label: 'cake',
    imgPath:
      'https://source.unsplash.com/random/?cake[5]',
  },
  {
    label: 'cake',
    imgPath:
      'https://source.unsplash.com/random/?cake[6]',
  },
  {
    label: 'cake',
    imgPath:
      'https://source.unsplash.com/random/?cake[7]',
  },
  {
    label: 'cake',
    imgPath:
      'https://source.unsplash.com/random/?cake[8]',
  },
  {
    label: 'cake',
    imgPath:
      'https://source.unsplash.com/random/?cake[9]',
  },
  {
    label: 'cup cake',
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
                  {/* <Typography variant="body2" color="text.secondary">
                    Cake description
                  </Typography> */}
                </CardContent>
                {/* <CardActions>
                  <Button size="small">Share</Button>
                  <Button size="small">Learn More</Button>
                </CardActions> */}
              </Card>
            </SwiperSlide>
          )
        })}
      </Swiper>
    </Container>
  )
}

export default FrequentlyBought;