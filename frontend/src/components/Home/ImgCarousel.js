import {NavLink} from 'react-router-dom';

function ImgCarousel () {

    return (
        <div className="carousel-container">
            <div className="carousel-img">
                <img src="/images/foodtruck.jpg" alt="food truck" />
            </div>
            <div className="carousel-body">
                <h3>Hidden Gems in the City</h3>
                <NavLink to="/query/truck"><i className="fa-solid fa-magnifying-glass">Food Trucks</i></NavLink>
            </div>
        </div>
    )
}

export default ImgCarousel;
