import React, { useState, useEffect } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import Slider from "react-slick";

export default function CategorySlider() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  var settings = {
    infinite: true,
    speed: 6000,
    swipe: true,
    swipeToSlide: true,
    slidesToShow: 7,
    autoplay: true,
    draggable: true,
    autoplaySpeed: 0,
    pauseOnHover: false,
    slidesToScroll: 1,
    cssEase: "linear",

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
          autoplay: true,
          cssEase: "linear",
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          autoplay: true,
          cssEase: "linear",
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          autoplay: true,
          cssEase: "linear",
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          autoplay: true,
          cssEase: "linear",
        },
      },
    ],
  };

  useEffect(() => {
    axios
      .get("https://ecommerce.routemisr.com/api/v1/categories")
      .then((response) => {
        setCategories(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  return (
    <>
      {categories.length > 0 && (
        <div className='my-3'>
          <h3>Shop Popular Categories</h3>
          <Slider {...settings}>
            {categories.map((category) => (
              <div
                key={category._id}
                className='mt-2'>
                <img
                  className='w-100'
                  height={160}
                  src={category.image}
                  alt='popular categories'
                />
              </div>
            ))}
          </Slider>
        </div>
      )}
    </>
  );
}
