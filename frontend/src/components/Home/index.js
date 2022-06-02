import React from 'react';
import ImgCarousel from './ImgCarousel';
import './Home.css';

function Home () {
    return (
        <>
        <ImgCarousel />
        <div className="home-container">
            <h1>Selected Businesses</h1>
        </div>

        </>
    );
}

export default Home;
