import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import { Navigation } from "swiper/modules";

const ProductCarousel = ({ imageUrls }) => {
  return (
    <>
      <Swiper
        loop={false}
        navigation={true}
        modules={[Navigation]}
        className="w-full overflow-hidden"
      >
        {imageUrls?.map((item) => (
          <SwiperSlide key={item}>
            <img
              className="w-full object-cover aspect-[1/1] md:aspect-[576/597]"
              src={item}
              alt=""
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default ProductCarousel;
