import React from 'react';
import img1 from '../assets/image1.png';
import img2 from '../assets/image2.png';
import img3 from '../assets/image3.png';
import img4 from '../assets/image4.png';
import img5 from '../assets/image5.png';
import img6 from '../assets/image6.png';
import img7 from '../assets/image7.png';
import img8 from '../assets/image8.png';
import img9 from '../assets/image9.png';
import img10 from '../assets/image10.png';
import img11 from '../assets/image11.png';
import img12 from '../assets/image12.png';
import d1 from "../assets/drink1.png";
import d2 from "../assets/drink2.png";
import d3 from "../assets/drink3.png";
import d4 from "../assets/drink4.png";
import d5 from "../assets/drink5.png";
import d6 from "../assets/drink6.png";
import d7 from "../assets/drink7.png";
import d8 from "../assets/drink8.png";
import d9 from "../assets/drink9.png";
import d10 from "../assets/drink10.png";

export default function ImageCarousel() {
    // Top row images (scrolling left to right)
    const topRowImages = [
        img1,
        img2,
        img3,
        img4,
        img5,
        img6,
        img7,
        img8,
        img9,
        img10,
        img11,
        img12,
    ];

    // Bottom row images (scrolling right to left) - Drinks
    const bottomRowImages = [
        d1,
        d2,
        d3,
        d4,
        d5,
        d6,
        d8,
        d9,
        d10,
    ];

    return (
        <div className="carousel-section">
            {/* Heading for Carousel */}
            <h2 className="section-heading">
                Featured Food Gallery
            </h2>
            
            {/* Top Carousel - Left to Right */}
            <div className="carousel-container">
                <div className="carousel-track carousel-ltr">
                    {/* Duplicate images for seamless loop */}
                    {[...topRowImages, ...topRowImages].map((img, index) => (
                        <div key={index} className="carousel-item">
                            <img 
                                src={img} 
                                alt={`Food ${index + 1}`}
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Bottom Carousel - Right to Left - Drinks */}
            <div className="carousel-container">
                <div className="carousel-track carousel-rtl">
                    {/* Duplicate images for seamless loop */}
                    {[...bottomRowImages, ...bottomRowImages].map((drink, index) => (
                        <div key={index} className="carousel-item">
                            <img 
                                src={drink} 
                                alt={`Drink ${index + 1}`}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}