import React, { useState, useEffect, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ProductCarousel = ({ images }) => {
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  let sliderRef1 = useRef(null);
  let sliderRef2 = useRef(null);

  useEffect(() => {
    setNav1(sliderRef1);
    setNav2(sliderRef2);
  }, []);

  return (
    <div className="product-carousel">
      <Slider
        className="lg:mb-5"
        arrows={true}
        asNavFor={nav2}
        ref={(slider) => (sliderRef1 = slider)}
      >
        {images?.map((image) => (
          <div key={image} className="px-1">
            <img
              className="w-full object-cover aspect-square md:aspect-[576/597]"
              src={image}
              loading="lazy"
            />
          </div>
        ))}
      </Slider>
      <Slider
        arrows={false}
        asNavFor={nav1}
        ref={(slider) => (sliderRef2 = slider)}
        slidesToShow={4}
        swipeToSlide={true}
        focusOnSelect={true}
      >
        {images?.map((image) => (
          <div key={image} className="px-1">
            <img
              className="w-full  object-cover aspect-square md:aspect-[135/162]"
              src={image}
              loading="lazy"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ProductCarousel;
