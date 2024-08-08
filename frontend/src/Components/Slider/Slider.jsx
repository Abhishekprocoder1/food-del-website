import React, { useState } from 'react'
import './Slider.css'
const Slider = ({Imgage}) => {

    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % Imgage.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + Imgage.length) % Imgage.length);
    };


    return (
        <div className="slider">
            <div className="slide">
                <img src={Imgage[currentIndex]} alt="slider image" />
            </div>
            <div className="buttons">
                <button className="left-arrow" onClick={prevSlide}>&#10094;</button>
                <button className="right-arrow" onClick={nextSlide}>&#10095;</button>
            </div>
        </div>
    )
}

export default Slider