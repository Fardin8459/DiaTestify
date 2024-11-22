import React from 'react';
import Slider from 'react-slick';
import './Background.css';
import img1 from "../../assets/bg1.jpg";
import img2 from "../../assets/bg2.png";
import img3 from "../../assets/bg3.jpg";

const slideData = [
  {
    id: 1,
    title: 'Welcome to Our Site',
    description: 'Discover amazing content tailored just for you.',
    image: img1,
  },
  {
    id: 2,
    title: 'Diabetes Prediction',
    description: 'Get insights into your health with our advanced prediction model.',
    image: img2,
  },
  {
    id: 3,
    title: 'Health Tips',
    description: 'Explore tips to live a healthier life with better habits.',
    image: img3,
  },
];

const BackgroundImageComponent = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000,
    fade: true,
  };

  return (
    <div className="slider-container">
      <Slider {...settings}>
        {slideData.map((slide) => (
          <div key={slide.id} className="slider-item">
            <img src={slide.image} alt={slide.title} className="slider-image" />
            <div className="slider-text">
              <h2>{slide.title}</h2>
              <p>{slide.description}</p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default BackgroundImageComponent;
