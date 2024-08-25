import React, { useEffect, useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Keep this import for carousel styles
// import { getProducts } from '../services/api';
import CountdownTimer from '../components/CountdownTimer';
import s1 from '../assets/s1.png'
import s2 from '../assets/s2.png'
import s3 from '../assets/s3.png'
import s4 from '../assets/images.jpg'
import b1 from '../assets/b1.avif'
import b3 from '../assets/b3.jpg'
import b2 from '../assets/b2.jpg'
import DashboardProductList from '../components/DashboardProductList';
import CarouselComponent from '../components/CarouselComponent';
import ParallaxCarousel from '../components/ParallaxCarousel';

const brandImages = [
    '../assets/images.jpg',
    '../assets/images.jpg',
    '../assets/images.jpg',
    '../assets/images.jpg',
    '../assets/images.jpg',
    '../assets/images.jpg',
    '../assets/images.jpg',
    '../assets/images.jpg'
];
// const productChunks = chunkArray(products, 5);

const Home = () => {
    const targetDate = new Date('2024-08-27T23:59:59');
    return (
        <div className="container mx-auto px-4 py-6">
            {/* Main Carousel */}
            <div className="w-full mb-8 px-4 sm:px-6 lg:px-8">
                <Carousel
                    showArrows={true}
                    autoPlay={true}
                    infiniteLoop={true}
                    showThumbs={false}
                    showStatus={false} // Hide the status indicators
                    className="relative rounded-lg overflow-hidden shadow-lg"
                >
                    <div className="relative overflow-hidden rounded-lg">
                        <img
                            className="w-full h-64 sm:h-80 md:h-96 object-cover rounded-lg"
                            src={b3}
                            alt="Slide 1"
                        />
                    </div>
                    <div className="relative overflow-hidden rounded-lg">
                        <img
                            className="w-full h-64 sm:h-80 md:h-96 object-cover rounded-lg"
                            src={b1}
                            alt="Slide 2"
                        />
                    </div>
                    <div className="relative overflow-hidden rounded-lg">
                        <img
                            className="w-full h-64 sm:h-80 md:h-96 object-cover rounded-lg"
                            src={b2}
                            alt="Slide 3"
                        />
                    </div>
                </Carousel>
            </div>
            <header className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 sm:p-6 lg:p-8 border-b-2 border-gray-300 rounded-md shadow-md">
                <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-4 sm:mb-0 text-center sm:text-left">
                        Flash Sales
                    </h1>
                    <div className="flex flex-wrap items-center space-x-4 sm:space-x-6">
                        <CountdownTimer targetDate={targetDate} />
                    </div>
                </div>
            </header>

            <CarouselComponent />

            {/* Brands Carousel */}
            <div className="w-full px-4 sm:px-6 lg:px-8 mb-8">
                <h2 className="text-3xl font-extrabold text-gray-900 mb-6 text-center">Our Brands</h2>
                <Carousel
                    showArrows={true}
                    autoPlay={true}
                    infiniteLoop={true}
                    showThumbs={false}
                    showStatus={false}
                    className="relative rounded-lg"
                    swipeable
                    dynamicHeight
                    emulateTouch
                    // Responsive breakpoints
                    renderIndicator={clickHandler => (
                        <button
                            type="button"
                            onClick={clickHandler}
                            className="bg-gray-800 w-2 h-2 rounded-full mx-1 focus:outline-none"
                        />
                    )}
                    renderArrowPrev={(clickHandler, hasPrev) => (
                        <button
                            type="button"
                            onClick={clickHandler}
                            className="absolute top-1/2 left-0 transform -translate-y-1/2 text-white bg-gray-800 p-2 rounded-full focus:outline-none"
                            disabled={!hasPrev}
                        >
                            &#10094;
                        </button>
                    )}
                    renderArrowNext={(clickHandler, hasNext) => (
                        <button
                            type="button"
                            onClick={clickHandler}
                            className="absolute top-1/2 right-0 transform -translate-y-1/2 text-white bg-gray-800 p-2 rounded-full focus:outline-none"
                            disabled={!hasNext}
                        >
                            &#10095;
                        </button>
                    )}
                >
                    {brandImages.map((src, index) => (
                        <div key={index} className="flex justify-center items-center">
                            <img
                                src={s4}
                                alt={`Brand ${index}`}
                                className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 object-contain"
                            />
                        </div>
                    ))}
                </Carousel>
            </div>

            {/* two card */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="relative overflow-hidden rounded-lg shadow-lg bg-white aspect-w-16 aspect-h-9">
                    <img
                        src="https://nayejaisa.com/wp-content/uploads/2024/03/JBL-Earbuds.webp"
                        alt="JBL Earbuds"
                        className="w-full h-full object-cover rounded-t-lg"
                    />
                </div>
                <div className="relative overflow-hidden rounded-lg shadow-lg bg-white aspect-w-16 aspect-h-9">
                    <img
                        src="https://nayejaisa.com/wp-content/uploads/2024/03/JBL-Earbuds.webp"
                        alt="JBL Earbuds"
                        className="w-full h-full object-cover rounded-t-lg"
                    />
                </div>
            </div>



            <DashboardProductList />

            <ParallaxCarousel/>
        </div>
    );
};

export default Home;
