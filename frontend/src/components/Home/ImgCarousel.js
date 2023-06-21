import {NavLink} from 'react-router-dom';
import { useState, useEffect } from 'react';

function ImgCarousel () {

    const queries = [
        {
            src: "/images/foodtruck.jpg",
            header: 'Hidden Gems in Your Neighborhood',
            query: 'truck',
            queryHeading: 'Food Trucks'
        },
        {
            src: "/images/nightlife.jpeg",
            header: 'Explore the Other Side of Your City',
            query: 'bar',
            queryHeading: 'Nightlife'
        }
    ]

    const [carouselCard, setCarouselCard] = useState(queries[0])

    useEffect(() => {
        let i = 1;
        setInterval(() => {
          setCarouselCard(queries[i]);
          i = (i + 1) % queries.length;
        }, 4000);

        // return () => clearInterval(interval);
      }, [])

    return carouselCard && (
        <div className="carousel-container">
            <div className="carousel-img">
                <img src={carouselCard.src} alt="food truck" />
            </div>
            <div className="carousel-body">
                <h1>{carouselCard.header}</h1>
                <NavLink className='carousel-query' to={`/search/${carouselCard.query}`}><i className="fa-solid fa-magnifying-glass"> {' ' + carouselCard.queryHeading}</i></NavLink>
            </div>
        </div>
    )
}

export default ImgCarousel;
