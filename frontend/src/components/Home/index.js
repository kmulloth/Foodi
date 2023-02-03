import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import ImgCarousel from './ImgCarousel';
import ConfirmDeleteReviewModal from '../ConfirmDeleteReviewModal';
import * as reviewActions from '../../store/reviews';
import './Home.css';

function Home () {
    const dispatch = useDispatch();
    const reviews = useSelector(state => state?.reviews);
    const user = useSelector(state => state?.session?.user);

    useEffect(() => {
        dispatch(reviewActions.getReviews());
    }, [dispatch]);

    return (
        <>
        <ImgCarousel />
        <div className="recent-reviews">
            <div className='categories'>
                <NavLink to='/search/bar' className='category-query'><img src='/icons/png/004-drink.png'/>Nightlife</NavLink>
                <NavLink to='/search/truck' className='category-query'><img src='/icons/png/003-food-truck.png'/>Food Trucks</NavLink>
                <NavLink to='/search/diner' className='category-query'><img src='/icons/png/005-christmas-dinner.png'/>Diners</NavLink>
                <NavLink to='/search/french' className='category-query'><img src='/icons/png/002-fried-potatoes.png'/>French</NavLink>
                <NavLink to='/search/italian' className='category-query'><img src='/icons/png/006-pasta.png'/>Italian</NavLink>
                <NavLink to='/search/japanese' className='category-query'><img src='/icons/png/007-sushi.png'/>Japanese</NavLink>
                <NavLink to='/search/chinese' className='category-query'><img src='/icons/png/001-ramen.png'/>Chinese</NavLink>
                <NavLink to='/search/indian' className='category-query'><img src='/icons/png/008-food.png'/>Indian</NavLink>
            </div>
            <h1>Recent Reviews</h1>
            {Object.values(reviews).sort((a, b) => {
                  const dateA = new Date(a?.createdAt);
                  const dateB = new Date(b?.createdAt);
                  return dateB - dateA;
                }).map(review => (
                <NavLink to={`/businesses/${review?.business_id}`} key={review?.id} className='to-biz'>
                    <div className="review" key={review?.id}>
                        <div className="Business-review" key={review?.id}>
                            <div className="review-img">
                                <img src={review?.img ? review?.img : '/images/foodtruck.jpg'} alt="user-img" />
                            </div>
                            <div className="review-content">
                                <div className="review-header">
                                    <h4>{review?.User?.username === user?.username ? 'You' : review?.User?.username} at {review?.Business?.name} on {new Date(review?.createdAt).toDateString()}</h4>
                                    <div className="review-rating">
                                        <div
                                            className="Stars"
                                            style={{'--rating': review?.value}}
                                            aria-label={`Rating of this business is ${review?.value / 5 * 100}%`}
                                        />
                                            {user?.id === review?.user_id && (<ConfirmDeleteReviewModal reviewId={review?.id}/>)}
                                    </div>
                                </div>
                                <p>{review?.body}</p>
                            </div>
                        </div>
                    </div>
                </NavLink>
            ))}
        </div>
        </>
    );
}

export default Home;
